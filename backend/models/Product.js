const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
    index: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['handicrafts', 'textiles', 'agro-products', 'local-foods', 'jewelry', 'pottery', 'woodwork', 'metalwork', 'other'],
    index: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  price: {
    current: {
      type: Number,
      required: [true, 'Current price is required'],
      min: [0, 'Price cannot be negative']
    },
    original: {
      type: Number,
      min: [0, 'Original price cannot be negative']
    },
    currency: {
      type: String,
      default: 'INR',
      enum: ['INR', 'USD', 'EUR']
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    isPrimary: {
      type: Boolean,
      default: false
    },
    cloudinaryId: String
  }],
  specifications: {
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ['cm', 'inch', 'm'],
        default: 'cm'
      }
    },
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ['g', 'kg', 'lb'],
        default: 'g'
      }
    },
    material: {
      type: String,
      trim: true
    },
    color: [{
      type: String,
      trim: true
    }],
    ageGroup: {
      type: String,
      enum: ['0-2', '3-5', '6-12', '13-18', '18+', 'all-ages']
    },
    careInstructions: {
      type: String,
      maxlength: [500, 'Care instructions cannot exceed 500 characters']
    }
  },
  inventory: {
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
      min: 0
    },
    trackInventory: {
      type: Boolean,
      default: true
    }
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller ID is required'],
    index: true
  },
  seller: {
    type: String,
    required: [true, 'Seller name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Product location is required'],
    trim: true,
    index: true
  },
  verified: {
    type: Boolean,
    default: false,
    index: true
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'out-of-stock', 'discontinued'],
    default: 'draft',
    index: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title cannot exceed 60 characters']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    keywords: [{
      type: String,
      trim: true,
      lowercase: true
    }]
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0,
      min: 0
    },
    distribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 }
    }
  },
  statistics: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    totalSales: {
      type: Number,
      default: 0
    },
    revenue: {
      type: Number,
      default: 0
    }
  },
  shipping: {
    weight: {
      type: Number,
      min: 0
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    shippingCost: {
      type: Number,
      min: 0,
      default: 0
    },
    processingTime: {
      type: Number,
      default: 2,
      min: 1
    }
  },
  variants: [{
    name: {
      type: String,
      required: true
    },
    options: [{
      value: String,
      price: Number,
      stock: Number,
      sku: String,
      image: String
    }]
  }],
  customization: {
    available: {
      type: Boolean,
      default: false
    },
    options: [{
      name: String,
      type: {
        type: String,
        enum: ['text', 'color', 'size', 'material']
      },
      required: Boolean,
      additionalCost: Number
    }]
  },
  certifications: [{
    name: {
      type: String,
      required: true
    },
    issuedBy: String,
    certificateUrl: String,
    validUntil: Date
  }],
  sustainability: {
    ecoFriendly: {
      type: Boolean,
      default: false
    },
    recyclable: {
      type: Boolean,
      default: false
    },
    sustainableMaterials: {
      type: Boolean,
      default: false
    },
    carbonNeutral: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ 'price.current': 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ sellerId: 1, status: 1 });
productSchema.index({ verified: 1, featured: 1 });
productSchema.index({ location: 1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.price.original && this.price.original > this.price.current) {
    return Math.round(((this.price.original - this.price.current) / this.price.original) * 100);
  }
  return 0;
});

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : (this.images.length > 0 ? this.images[0].url : null);
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.inventory.stock === 0) return 'out-of-stock';
  if (this.inventory.stock <= this.inventory.lowStockThreshold) return 'low-stock';
  return 'in-stock';
});

// Virtual for full location with seller
productSchema.virtual('fullLocation').get(function() {
  return `${this.location} - ${this.seller}`;
});

// Pre-save middleware to generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Add timestamp to ensure uniqueness
    if (this.isNew) {
      this.slug += '-' + Date.now();
    }
  }
  
  // Generate SKU if not provided
  if (this.isNew && !this.inventory.sku) {
    const categoryCode = this.category.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    this.inventory.sku = `${categoryCode}${timestamp}`;
  }
  
  // Set primary image if none exists
  if (this.images.length > 0 && !this.images.some(img => img.isPrimary)) {
    this.images[0].isPrimary = true;
  }
  
  // Update status based on stock
  if (this.inventory.trackInventory && this.inventory.stock === 0) {
    this.status = 'out-of-stock';
  }
  
  next();
});

// Instance method to check if product is available
productSchema.methods.isAvailable = function() {
  return this.status === 'active' && this.inventory.stock > 0;
};

// Instance method to check if product is low stock
productSchema.methods.isLowStock = function() {
  return this.inventory.stock <= this.inventory.lowStockThreshold;
};

// Instance method to update stock
productSchema.methods.updateStock = function(quantity, operation = 'subtract') {
  if (operation === 'subtract') {
    this.inventory.stock = Math.max(0, this.inventory.stock - quantity);
  } else if (operation === 'add') {
    this.inventory.stock += quantity;
  }
  
  // Update status based on new stock
  if (this.inventory.trackInventory && this.inventory.stock === 0) {
    this.status = 'out-of-stock';
  } else if (this.status === 'out-of-stock' && this.inventory.stock > 0) {
    this.status = 'active';
  }
  
  return this.save();
};

// Instance method to update rating
productSchema.methods.updateRating = function(newRating, oldRating = null) {
  if (oldRating) {
    // Update existing rating
    this.ratings.distribution[oldRating]--;
    this.ratings.distribution[newRating]++;
  } else {
    // Add new rating
    this.ratings.count++;
    this.ratings.distribution[newRating]++;
  }
  
  // Recalculate average
  let totalRating = 0;
  let totalCount = 0;
  
  for (let i = 1; i <= 5; i++) {
    totalRating += i * this.ratings.distribution[i];
    totalCount += this.ratings.distribution[i];
  }
  
  this.ratings.average = totalCount > 0 ? (totalRating / totalCount) : 0;
  this.ratings.count = totalCount;
  
  return this.save();
};

// Instance method to increment views
productSchema.methods.incrementViews = function() {
  this.statistics.views++;
  return this.save();
};

// Static method to find products by category
productSchema.statics.findByCategory = function(category, subcategory = null) {
  const query = { category };
  if (subcategory) query.subcategory = subcategory;
  return this.find(query);
};

// Static method to find featured products
productSchema.statics.findFeatured = function(limit = 10) {
  return this.find({ featured: true, status: 'active' })
    .sort({ 'ratings.average': -1, createdAt: -1 })
    .limit(limit);
};

// Static method to find products by seller
productSchema.statics.findBySeller = function(sellerId) {
  return this.find({ sellerId });
};

// Static method to search products
productSchema.statics.searchProducts = function(query, options = {}) {
  const {
    category,
    minPrice,
    maxPrice,
    location,
    verified,
    inStock,
    sortBy = 'relevance',
    limit = 20,
    skip = 0
  } = options;
  
  let searchQuery = {
    status: 'active',
    $text: { $search: query }
  };
  
  if (category) searchQuery.category = category;
  if (minPrice || maxPrice) {
    searchQuery['price.current'] = {};
    if (minPrice) searchQuery['price.current'].$gte = minPrice;
    if (maxPrice) searchQuery['price.current'].$lte = maxPrice;
  }
  if (location) searchQuery.location = new RegExp(location, 'i');
  if (verified) searchQuery.verified = true;
  if (inStock) searchQuery['inventory.stock'] = { $gt: 0 };
  
  let sort = {};
  switch (sortBy) {
    case 'price-low':
      sort = { 'price.current': 1 };
      break;
    case 'price-high':
      sort = { 'price.current': -1 };
      break;
    case 'rating':
      sort = { 'ratings.average': -1 };
      break;
    case 'newest':
      sort = { createdAt: -1 };
      break;
    case 'popular':
      sort = { 'statistics.views': -1 };
      break;
    default:
      sort = { score: { $meta: 'textScore' } };
  }
  
  return this.find(searchQuery, { score: { $meta: 'textScore' } })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('sellerId', 'name businessInfo.businessName verified');
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
