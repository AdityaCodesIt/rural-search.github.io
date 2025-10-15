const jwt = require('jsonwebtoken');
const { verifyFirebaseToken } = require('../config/firebase');
const User = require('../models/User');

// Middleware to verify Firebase token and authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided or invalid format.',
        error: 'MISSING_TOKEN'
      });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(token);
    
    if (!decodedToken || !decodedToken.uid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
        error: 'INVALID_TOKEN'
      });
    }
    
    // Find user in database
    const user = await User.findOne({ firebaseUID: decodedToken.uid });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Please register first.',
        error: 'USER_NOT_FOUND'
      });
    }
    
    // Check if user account is active
    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Account suspended. Please contact support.',
        error: 'ACCOUNT_SUSPENDED'
      });
    }
    
    if (user.status === 'inactive') {
      return res.status(403).json({
        success: false,
        message: 'Account inactive. Please activate your account.',
        error: 'ACCOUNT_INACTIVE'
      });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Attach user to request object
    req.user = user;
    req.firebaseUser = decodedToken;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.message.includes('Firebase')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Firebase token.',
        error: 'FIREBASE_TOKEN_INVALID'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Authentication failed.',
      error: 'AUTH_ERROR'
    });
  }
};

// Middleware to check if user has specific role
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
        error: 'NOT_AUTHENTICATED'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`,
        error: 'INSUFFICIENT_PERMISSIONS'
      });
    }
    
    next();
  };
};

// Middleware to check if user is verified
const requireVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
      error: 'NOT_AUTHENTICATED'
    });
  }
  
  if (!req.user.verified) {
    return res.status(403).json({
      success: false,
      message: 'Account verification required.',
      error: 'NOT_VERIFIED'
    });
  }
  
  next();
};

// Middleware to check if user is admin
const requireAdmin = requireRole('admin');

// Middleware to check if user is entrepreneur
const requireEntrepreneur = requireRole('entrepreneur');

// Middleware to check if user is buyer
const requireBuyer = requireRole('buyer');

// Middleware to check if user is entrepreneur or admin
const requireEntrepreneurOrAdmin = requireRole('entrepreneur', 'admin');

// Middleware to check if user is buyer or admin
const requireBuyerOrAdmin = requireRole('buyer', 'admin');

// Middleware for optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without authentication
    }
    
    const token = authHeader.substring(7);
    const decodedToken = await verifyFirebaseToken(token);
    
    if (decodedToken && decodedToken.uid) {
      const user = await User.findOne({ firebaseUID: decodedToken.uid });
      if (user && user.status === 'active') {
        req.user = user;
        req.firebaseUser = decodedToken;
      }
    }
    
    next();
  } catch (error) {
    // Silently continue without authentication
    next();
  }
};

// Middleware to check resource ownership
const checkOwnership = (resourceModel, resourceIdParam = 'id', ownerField = 'userId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required.',
          error: 'NOT_AUTHENTICATED'
        });
      }
      
      // Admin can access everything
      if (req.user.role === 'admin') {
        return next();
      }
      
      const resourceId = req.params[resourceIdParam];
      const Model = require(`../models/${resourceModel}`);
      
      const resource = await Model.findById(resourceId);
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found.',
          error: 'RESOURCE_NOT_FOUND'
        });
      }
      
      // Check ownership
      const ownerId = resource[ownerField];
      if (ownerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only access your own resources.',
          error: 'NOT_OWNER'
        });
      }
      
      req.resource = resource;
      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error checking resource ownership.',
        error: 'OWNERSHIP_CHECK_ERROR'
      });
    }
  };
};

// Middleware to validate API key for external integrations
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key required.',
      error: 'MISSING_API_KEY'
    });
  }
  
  // In production, validate against stored API keys
  const validApiKeys = process.env.VALID_API_KEYS?.split(',') || [];
  
  if (!validApiKeys.includes(apiKey)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid API key.',
      error: 'INVALID_API_KEY'
    });
  }
  
  next();
};

// Middleware to check if user can perform action on specific product
const checkProductAccess = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
        error: 'NOT_AUTHENTICATED'
      });
    }
    
    // Admin can access all products
    if (req.user.role === 'admin') {
      return next();
    }
    
    const productId = req.params.id || req.params.productId;
    const Product = require('../models/Product');
    
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
        error: 'PRODUCT_NOT_FOUND'
      });
    }
    
    // Check if user is the seller of the product
    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only manage your own products.',
        error: 'NOT_PRODUCT_OWNER'
      });
    }
    
    req.product = product;
    next();
  } catch (error) {
    console.error('Product access check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking product access.',
      error: 'PRODUCT_ACCESS_ERROR'
    });
  }
};

// Middleware to generate JWT token for internal API calls
const generateJWT = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    verified: user.verified
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    issuer: 'ruralreach-api',
    audience: 'ruralreach-app'
  });
};

// Middleware to verify JWT token (for internal API calls)
const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'JWT token required.',
        error: 'MISSING_JWT'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.jwtUser = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'JWT token expired.',
        error: 'JWT_EXPIRED'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Invalid JWT token.',
      error: 'INVALID_JWT'
    });
  }
};

module.exports = {
  authenticateUser,
  requireRole,
  requireVerification,
  requireAdmin,
  requireEntrepreneur,
  requireBuyer,
  requireEntrepreneurOrAdmin,
  requireBuyerOrAdmin,
  optionalAuth,
  checkOwnership,
  validateApiKey,
  checkProductAccess,
  generateJWT,
  verifyJWT
};
