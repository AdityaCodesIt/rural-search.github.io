const mongoose = require('mongoose');

// Custom error class for application-specific errors
class AppError extends Error {
  constructor(message, statusCode, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Handle Mongoose validation errors
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(error => ({
    field: error.path,
    message: error.message,
    value: error.value
  }));
  
  return new AppError('Validation failed', 400, 'VALIDATION_ERROR');
};

// Handle Mongoose duplicate key errors
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  
  let message = `Duplicate value for field: ${field}`;
  
  // Provide user-friendly messages for common fields
  if (field === 'email') {
    message = 'Email address already exists';
  } else if (field === 'phone') {
    message = 'Phone number already exists';
  } else if (field === 'sku') {
    message = 'Product SKU already exists';
  }
  
  return new AppError(message, 400, 'DUPLICATE_FIELD');
};

// Handle Mongoose cast errors (invalid ObjectId, etc.)
const handleCastError = (err) => {
  let message = `Invalid ${err.path}: ${err.value}`;
  
  if (err.path === '_id') {
    message = 'Invalid ID format';
  }
  
  return new AppError(message, 400, 'INVALID_DATA_FORMAT');
};

// Handle JWT errors
const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again.', 401, 'INVALID_TOKEN');
};

// Handle JWT expired errors
const handleJWTExpiredError = () => {
  return new AppError('Token expired. Please log in again.', 401, 'TOKEN_EXPIRED');
};

// Handle Firebase errors
const handleFirebaseError = (err) => {
  let message = 'Authentication failed';
  let errorCode = 'AUTH_ERROR';
  
  if (err.code === 'auth/id-token-expired') {
    message = 'Token expired. Please log in again.';
    errorCode = 'TOKEN_EXPIRED';
  } else if (err.code === 'auth/invalid-id-token') {
    message = 'Invalid token. Please log in again.';
    errorCode = 'INVALID_TOKEN';
  } else if (err.code === 'auth/user-not-found') {
    message = 'User not found. Please register first.';
    errorCode = 'USER_NOT_FOUND';
  }
  
  return new AppError(message, 401, errorCode);
};

// Send error response in development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    error: err.errorCode || 'INTERNAL_ERROR',
    message: err.message,
    stack: err.stack,
    details: {
      name: err.name,
      statusCode: err.statusCode,
      isOperational: err.isOperational
    }
  });
};

// Send error response in production
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      error: err.errorCode || 'OPERATION_FAILED',
      message: err.message
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥:', err);
    
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong on our end. Please try again later.'
    });
  }
};

// Main error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log error for debugging
  console.error('Error Handler:', {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    error = handleDuplicateKeyError(err);
  }
  
  // Mongoose cast error
  if (err.name === 'CastError') {
    error = handleCastError(err);
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  }
  
  if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError();
  }
  
  // Firebase errors
  if (err.code && err.code.startsWith('auth/')) {
    error = handleFirebaseError(err);
  }
  
  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new AppError('File size too large', 400, 'FILE_TOO_LARGE');
  }
  
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = new AppError('Unexpected file field', 400, 'UNEXPECTED_FILE');
  }
  
  // Rate limiting errors
  if (err.status === 429) {
    error = new AppError('Too many requests. Please try again later.', 429, 'RATE_LIMIT_EXCEEDED');
  }
  
  // CORS errors
  if (err.message && err.message.includes('CORS')) {
    error = new AppError('Cross-origin request blocked', 403, 'CORS_ERROR');
  }
  
  // Database connection errors
  if (err.name === 'MongoNetworkError' || err.name === 'MongoTimeoutError') {
    error = new AppError('Database connection failed. Please try again.', 503, 'DATABASE_ERROR');
  }
  
  // Set default values if not set
  error.statusCode = error.statusCode || 500;
  error.isOperational = error.isOperational || false;
  
  // Send error response
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};

// Async error wrapper to catch async errors
const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler for undefined routes
const notFound = (req, res, next) => {
  const error = new AppError(
    `Route ${req.originalUrl} not found`,
    404,
    'ROUTE_NOT_FOUND'
  );
  next(error);
};

// Unhandled promise rejection handler
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Promise Rejection:', err.message);
  console.error('Stack:', err.stack);
  
  // Close server gracefully
  process.exit(1);
});

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error('Stack:', err.stack);
  
  // Close server gracefully
  process.exit(1);
});

module.exports = {
  AppError,
  errorHandler,
  catchAsync,
  notFound
};
