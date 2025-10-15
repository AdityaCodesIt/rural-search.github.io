const Joi = require('joi');

// User validation schemas
const userSchemas = {
  register: Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
      .messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name cannot exceed 100 characters',
        'any.required': 'Name is required'
      }),
    email: Joi.string().email().lowercase().required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/).optional()
      .messages({
        'string.pattern.base': 'Please provide a valid Indian phone number'
      }),
    role: Joi.string().valid('buyer', 'entrepreneur').default('buyer'),
    location: Joi.object({
      address: Joi.string().trim().optional(),
      city: Joi.string().trim().optional(),
      state: Joi.string().trim().optional(),
      pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).optional()
        .messages({
          'string.pattern.base': 'Please provide a valid pincode'
        })
    }).optional(),
    businessInfo: Joi.when('role', {
      is: 'entrepreneur',
      then: Joi.object({
        businessName: Joi.string().trim().min(2).max(200).required(),
        businessType: Joi.string().valid('handicrafts', 'textiles', 'agro-products', 'local-foods', 'other').required(),
        gstNumber: Joi.string().pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).optional(),
        yearsInBusiness: Joi.number().min(0).max(100).optional(),
        description: Joi.string().max(1000).optional()
      }),
      otherwise: Joi.optional()
    })
  }),

  update: Joi.object({
    name: Joi.string().trim().min(2).max(100).optional(),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/).optional(),
    location: Joi.object({
      address: Joi.string().trim().optional(),
      city: Joi.string().trim().optional(),
      state: Joi.string().trim().optional(),
      pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).optional()
    }).optional(),
    profile: Joi.object({
      bio: Joi.string().max(500).optional(),
      dateOfBirth: Joi.date().max('now').optional(),
      gender: Joi.string().valid('male', 'female', 'other', 'prefer-not-to-say').optional()
    }).optional(),
    businessInfo: Joi.object({
      businessName: Joi.string().trim().min(2).max(200).optional(),
      businessType: Joi.string().valid('handicrafts', 'textiles', 'agro-products', 'local-foods', 'other').optional(),
      gstNumber: Joi.string().pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).optional(),
      yearsInBusiness: Joi.number().min(0).max(100).optional(),
      description: Joi.string().max(1000).optional(),
      specialties: Joi.array().items(Joi.string().trim()).optional()
    }).optional(),
    preferences: Joi.object({
      language: Joi.string().valid('en', 'hi', 'mr', 'gu', 'ta', 'te', 'kn', 'ml').optional(),
      notifications: Joi.object({
        email: Joi.boolean().optional(),
        sms: Joi.boolean().optional(),
        push: Joi.boolean().optional()
      }).optional()
    }).optional()
  })
};

// Product validation schemas
const productSchemas = {
  create: Joi.object({
    title: Joi.string().trim().min(5).max(200).required()
      .messages({
        'string.min': 'Product title must be at least 5 characters long',
        'string.max': 'Product title cannot exceed 200 characters',
        'any.required': 'Product title is required'
      }),
    description: Joi.string().trim().min(20).max(2000).required()
      .messages({
        'string.min': 'Description must be at least 20 characters long',
        'string.max': 'Description cannot exceed 2000 characters',
        'any.required': 'Product description is required'
      }),
    shortDescription: Joi.string().trim().max(500).optional(),
    category: Joi.string().valid('handicrafts', 'textiles', 'agro-products', 'local-foods', 'jewelry', 'pottery', 'woodwork', 'metalwork', 'other').required(),
    subcategory: Joi.string().trim().optional(),
    price: Joi.object({
      current: Joi.number().positive().required()
        .messages({
          'number.positive': 'Price must be a positive number',
          'any.required': 'Current price is required'
        }),
      original: Joi.number().positive().optional(),
      currency: Joi.string().valid('INR', 'USD', 'EUR').default('INR')
    }).required(),
    specifications: Joi.object({
      dimensions: Joi.object({
        length: Joi.number().positive().optional(),
        width: Joi.number().positive().optional(),
        height: Joi.number().positive().optional(),
        unit: Joi.string().valid('cm', 'inch', 'm').default('cm')
      }).optional(),
      weight: Joi.object({
        value: Joi.number().positive().optional(),
        unit: Joi.string().valid('g', 'kg', 'lb').default('g')
      }).optional(),
      material: Joi.string().trim().optional(),
      color: Joi.array().items(Joi.string().trim()).optional(),
      ageGroup: Joi.string().valid('0-2', '3-5', '6-12', '13-18', '18+', 'all-ages').optional(),
      careInstructions: Joi.string().max(500).optional()
    }).optional(),
    inventory: Joi.object({
      stock: Joi.number().integer().min(0).required()
        .messages({
          'number.min': 'Stock cannot be negative',
          'any.required': 'Stock quantity is required'
        }),
      sku: Joi.string().trim().uppercase().optional(),
      lowStockThreshold: Joi.number().integer().min(0).default(5),
      trackInventory: Joi.boolean().default(true)
    }).required(),
    location: Joi.string().trim().min(2).max(200).required(),
    tags: Joi.array().items(Joi.string().trim().lowercase()).max(10).optional(),
    shipping: Joi.object({
      weight: Joi.number().positive().optional(),
      dimensions: Joi.object({
        length: Joi.number().positive().optional(),
        width: Joi.number().positive().optional(),
        height: Joi.number().positive().optional()
      }).optional(),
      freeShipping: Joi.boolean().default(false),
      shippingCost: Joi.number().min(0).default(0),
      processingTime: Joi.number().integer().min(1).default(2)
    }).optional(),
    customization: Joi.object({
      available: Joi.boolean().default(false),
      options: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          type: Joi.string().valid('text', 'color', 'size', 'material').required(),
          required: Joi.boolean().default(false),
          additionalCost: Joi.number().min(0).default(0)
        })
      ).optional()
    }).optional()
  }),

  update: Joi.object({
    title: Joi.string().trim().min(5).max(200).optional(),
    description: Joi.string().trim().min(20).max(2000).optional(),
    shortDescription: Joi.string().trim().max(500).optional(),
    category: Joi.string().valid('handicrafts', 'textiles', 'agro-products', 'local-foods', 'jewelry', 'pottery', 'woodwork', 'metalwork', 'other').optional(),
    subcategory: Joi.string().trim().optional(),
    price: Joi.object({
      current: Joi.number().positive().optional(),
      original: Joi.number().positive().optional(),
      currency: Joi.string().valid('INR', 'USD', 'EUR').optional()
    }).optional(),
    specifications: Joi.object({
      dimensions: Joi.object({
        length: Joi.number().positive().optional(),
        width: Joi.number().positive().optional(),
        height: Joi.number().positive().optional(),
        unit: Joi.string().valid('cm', 'inch', 'm').optional()
      }).optional(),
      weight: Joi.object({
        value: Joi.number().positive().optional(),
        unit: Joi.string().valid('g', 'kg', 'lb').optional()
      }).optional(),
      material: Joi.string().trim().optional(),
      color: Joi.array().items(Joi.string().trim()).optional(),
      ageGroup: Joi.string().valid('0-2', '3-5', '6-12', '13-18', '18+', 'all-ages').optional(),
      careInstructions: Joi.string().max(500).optional()
    }).optional(),
    inventory: Joi.object({
      stock: Joi.number().integer().min(0).optional(),
      sku: Joi.string().trim().uppercase().optional(),
      lowStockThreshold: Joi.number().integer().min(0).optional(),
      trackInventory: Joi.boolean().optional()
    }).optional(),
    location: Joi.string().trim().min(2).max(200).optional(),
    tags: Joi.array().items(Joi.string().trim().lowercase()).max(10).optional(),
    status: Joi.string().valid('draft', 'active', 'inactive', 'out-of-stock', 'discontinued').optional(),
    featured: Joi.boolean().optional()
  })
};

// Order validation schemas
const orderSchemas = {
  create: Joi.object({
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().hex().length(24).required(),
        quantity: Joi.number().integer().min(1).required(),
        variant: Joi.object({
          name: Joi.string().optional(),
          value: Joi.string().optional()
        }).optional(),
        customization: Joi.array().items(
          Joi.object({
            name: Joi.string().required(),
            value: Joi.string().required()
          })
        ).optional()
      })
    ).min(1).required(),
    shippingAddress: Joi.object({
      fullName: Joi.string().trim().min(2).max(100).required(),
      phone: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
      email: Joi.string().email().required(),
      address: Joi.string().trim().min(10).max(500).required(),
      city: Joi.string().trim().min(2).max(100).required(),
      state: Joi.string().trim().min(2).max(100).required(),
      pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).required(),
      landmark: Joi.string().trim().max(200).optional()
    }).required(),
    billingAddress: Joi.object({
      fullName: Joi.string().trim().min(2).max(100).optional(),
      phone: Joi.string().pattern(/^[6-9]\d{9}$/).optional(),
      email: Joi.string().email().optional(),
      address: Joi.string().trim().min(10).max(500).optional(),
      city: Joi.string().trim().min(2).max(100).optional(),
      state: Joi.string().trim().min(2).max(100).optional(),
      pincode: Joi.string().pattern(/^[1-9][0-9]{5}$/).optional(),
      sameAsShipping: Joi.boolean().default(true)
    }).optional(),
    payment: Joi.object({
      method: Joi.string().valid('upi', 'card', 'netbanking', 'cod', 'wallet').required()
    }).required(),
    notes: Joi.object({
      buyer: Joi.string().max(500).optional()
    }).optional()
  }),

  updateStatus: Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'processing', 'shipped', 'out-for-delivery', 'delivered', 'cancelled', 'returned').required(),
    message: Joi.string().max(500).optional(),
    trackingNumber: Joi.string().trim().optional(),
    carrier: Joi.string().trim().optional(),
    estimatedDelivery: Joi.date().min('now').optional()
  })
};

// Review validation schemas
const reviewSchemas = {
  create: Joi.object({
    productId: Joi.string().hex().length(24).required(),
    orderId: Joi.string().hex().length(24).required(),
    rating: Joi.number().integer().min(1).max(5).required()
      .messages({
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating cannot exceed 5',
        'any.required': 'Rating is required'
      }),
    title: Joi.string().trim().max(100).optional(),
    comment: Joi.string().trim().min(10).max(1000).required()
      .messages({
        'string.min': 'Review comment must be at least 10 characters long',
        'string.max': 'Review comment cannot exceed 1000 characters',
        'any.required': 'Review comment is required'
      })
  }),

  update: Joi.object({
    rating: Joi.number().integer().min(1).max(5).optional(),
    title: Joi.string().trim().max(100).optional(),
    comment: Joi.string().trim().min(10).max(1000).optional()
  }),

  response: Joi.object({
    message: Joi.string().trim().min(5).max(500).required()
      .messages({
        'string.min': 'Response must be at least 5 characters long',
        'string.max': 'Response cannot exceed 500 characters',
        'any.required': 'Response message is required'
      })
  }),

  report: Joi.object({
    reason: Joi.string().valid('spam', 'inappropriate', 'fake', 'offensive', 'other').required(),
    description: Joi.string().trim().max(500).optional()
  })
};

// Query validation schemas
const querySchemas = {
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    sort: Joi.string().optional(),
    order: Joi.string().valid('asc', 'desc').default('desc')
  }),

  productSearch: Joi.object({
    q: Joi.string().trim().min(2).optional(),
    category: Joi.string().valid('handicrafts', 'textiles', 'agro-products', 'local-foods', 'jewelry', 'pottery', 'woodwork', 'metalwork', 'other').optional(),
    minPrice: Joi.number().positive().optional(),
    maxPrice: Joi.number().positive().optional(),
    location: Joi.string().trim().optional(),
    verified: Joi.boolean().optional(),
    inStock: Joi.boolean().optional(),
    featured: Joi.boolean().optional(),
    sortBy: Joi.string().valid('relevance', 'price-low', 'price-high', 'rating', 'newest', 'popular').default('relevance'),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20)
  }),

  userFilter: Joi.object({
    role: Joi.string().valid('buyer', 'entrepreneur', 'admin').optional(),
    verified: Joi.boolean().optional(),
    status: Joi.string().valid('active', 'inactive', 'suspended', 'pending').optional(),
    city: Joi.string().trim().optional(),
    state: Joi.string().trim().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  }),

  orderFilter: Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'processing', 'shipped', 'out-for-delivery', 'delivered', 'cancelled', 'returned').optional(),
    paymentStatus: Joi.string().valid('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled').optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().min(Joi.ref('startDate')).optional(),
    minAmount: Joi.number().positive().optional(),
    maxAmount: Joi.number().positive().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  })
};

// Validation middleware factory
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const data = source === 'query' ? req.query : 
                  source === 'params' ? req.params : 
                  req.body;
    
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
        error: 'VALIDATION_ERROR'
      });
    }
    
    // Replace the original data with validated and sanitized data
    if (source === 'query') {
      req.query = value;
    } else if (source === 'params') {
      req.params = value;
    } else {
      req.body = value;
    }
    
    next();
  };
};

// Custom validation for MongoDB ObjectId
const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${paramName} format`,
        error: 'INVALID_OBJECT_ID'
      });
    }
    
    next();
  };
};

module.exports = {
  userSchemas,
  productSchemas,
  orderSchemas,
  reviewSchemas,
  querySchemas,
  validate,
  validateObjectId
};
