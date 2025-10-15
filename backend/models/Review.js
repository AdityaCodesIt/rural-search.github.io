const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required'],
    index: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Buyer ID is required'],
    index: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'Order ID is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Review title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true,
    maxlength: [1000, 'Review comment cannot exceed 1000 characters']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    cloudinaryId: String
  }],
  verified: {
    type: Boolean,
    default: false,
    index: true
  },
  helpful: {
    count: {
      type: Number,
      default: 0
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  reported: {
    count: {
      type: Number,
      default: 0
    },
    reasons: [{
      reason: {
        type: String,
        enum: ['spam', 'inappropriate', 'fake', 'offensive', 'other']
      },
      reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      reportedAt: {
        type: Date,
        default: Date.now
      },
      description: String
    }]
  },
  response: {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String,
      maxlength: [500, 'Response cannot exceed 500 characters']
    },
    respondedAt: Date
  },
  status: {
    type: String,
    enum: ['active', 'hidden', 'flagged', 'removed'],
    default: 'active',
    index: true
  },
  metadata: {
    source: {
      type: String,
      enum: ['web', 'mobile', 'api'],
      default: 'web'
    },
    userAgent: String,
    ipAddress: String,
    deviceInfo: {
      type: String
    }
  },
  moderation: {
    reviewed: {
      type: Boolean,
      default: false
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date,
    moderationNotes: String,
    autoModerated: {
      type: Boolean,
      default: false
    },
    sentimentScore: {
      type: Number,
      min: -1,
      max: 1
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound indexes for better query performance
reviewSchema.index({ productId: 1, rating: -1 });
reviewSchema.index({ buyerId: 1, createdAt: -1 });
reviewSchema.index({ productId: 1, verified: 1 });
reviewSchema.index({ productId: 1, status: 1, createdAt: -1 });
reviewSchema.index({ 'helpful.count': -1 });

// Unique constraint to prevent duplicate reviews from same buyer for same product
reviewSchema.index({ productId: 1, buyerId: 1 }, { unique: true });

// Virtual for review age
reviewSchema.virtual('ageInDays').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for helpful percentage
reviewSchema.virtual('helpfulPercentage').get(function() {
  const totalVotes = this.helpful.count + this.reported.count;
  if (totalVotes === 0) return 0;
  return Math.round((this.helpful.count / totalVotes) * 100);
});

// Virtual for star display
reviewSchema.virtual('starDisplay').get(function() {
  return '★'.repeat(this.rating) + '☆'.repeat(5 - this.rating);
});

// Virtual for review summary
reviewSchema.virtual('summary').get(function() {
  if (this.comment.length <= 100) return this.comment;
  return this.comment.substring(0, 97) + '...';
});

// Pre-save middleware
reviewSchema.pre('save', async function(next) {
  // Set verified status based on order verification
  if (this.isNew) {
    try {
      const Order = mongoose.model('Order');
      const order = await Order.findById(this.orderId);
      
      if (order && order.status === 'delivered') {
        this.verified = true;
      }
    } catch (error) {
      console.error('Error verifying review:', error);
    }
  }
  
  // Auto-moderation for inappropriate content
  if (this.isModified('comment') || this.isNew) {
    const inappropriateWords = ['spam', 'fake', 'scam', 'terrible', 'worst'];
    const hasInappropriateContent = inappropriateWords.some(word => 
      this.comment.toLowerCase().includes(word)
    );
    
    if (hasInappropriateContent) {
      this.moderation.autoModerated = true;
      this.status = 'flagged';
    }
  }
  
  next();
});

// Post-save middleware to update product rating
reviewSchema.post('save', async function(doc) {
  try {
    const Product = mongoose.model('Product');
    await Product.findById(doc.productId).then(product => {
      if (product) {
        product.updateRating(doc.rating);
      }
    });
  } catch (error) {
    console.error('Error updating product rating:', error);
  }
});

// Instance method to mark as helpful
reviewSchema.methods.markHelpful = function(userId) {
  if (!this.helpful.users.includes(userId)) {
    this.helpful.users.push(userId);
    this.helpful.count++;
  }
  return this.save();
};

// Instance method to unmark as helpful
reviewSchema.methods.unmarkHelpful = function(userId) {
  const index = this.helpful.users.indexOf(userId);
  if (index > -1) {
    this.helpful.users.splice(index, 1);
    this.helpful.count = Math.max(0, this.helpful.count - 1);
  }
  return this.save();
};

// Instance method to report review
reviewSchema.methods.reportReview = function(reason, reportedBy, description = '') {
  this.reported.reasons.push({
    reason,
    reportedBy,
    reportedAt: new Date(),
    description
  });
  this.reported.count++;
  
  // Auto-hide if too many reports
  if (this.reported.count >= 5) {
    this.status = 'flagged';
  }
  
  return this.save();
};

// Instance method to add seller response
reviewSchema.methods.addSellerResponse = function(sellerId, message) {
  this.response = {
    sellerId,
    message,
    respondedAt: new Date()
  };
  return this.save();
};

// Instance method to moderate review
reviewSchema.methods.moderate = function(action, moderatorId, notes = '') {
  this.moderation = {
    reviewed: true,
    reviewedBy: moderatorId,
    reviewedAt: new Date(),
    moderationNotes: notes
  };
  
  if (action === 'approve') {
    this.status = 'active';
  } else if (action === 'hide') {
    this.status = 'hidden';
  } else if (action === 'remove') {
    this.status = 'removed';
  }
  
  return this.save();
};

// Static method to get product reviews with pagination
reviewSchema.statics.getProductReviews = function(productId, options = {}) {
  const {
    page = 1,
    limit = 10,
    sortBy = 'newest',
    rating = null,
    verified = null
  } = options;
  
  let query = { productId, status: 'active' };
  
  if (rating) query.rating = rating;
  if (verified !== null) query.verified = verified;
  
  let sort = {};
  switch (sortBy) {
    case 'oldest':
      sort = { createdAt: 1 };
      break;
    case 'rating-high':
      sort = { rating: -1, createdAt: -1 };
      break;
    case 'rating-low':
      sort = { rating: 1, createdAt: -1 };
      break;
    case 'helpful':
      sort = { 'helpful.count': -1, createdAt: -1 };
      break;
    default:
      sort = { createdAt: -1 };
  }
  
  const skip = (page - 1) * limit;
  
  return this.find(query)
    .populate('buyerId', 'name profile.avatar')
    .populate('response.sellerId', 'name businessInfo.businessName')
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

// Static method to get review statistics for a product
reviewSchema.statics.getProductReviewStats = function(productId) {
  return this.aggregate([
    { $match: { productId: mongoose.Types.ObjectId(productId), status: 'active' } },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        averageRating: { $avg: '$rating' },
        ratingDistribution: {
          $push: '$rating'
        },
        verifiedReviews: {
          $sum: { $cond: ['$verified', 1, 0] }
        },
        totalHelpful: { $sum: '$helpful.count' }
      }
    },
    {
      $project: {
        _id: 0,
        totalReviews: 1,
        averageRating: { $round: ['$averageRating', 1] },
        verifiedReviews: 1,
        totalHelpful: 1,
        ratingBreakdown: {
          5: { $size: { $filter: { input: '$ratingDistribution', cond: { $eq: ['$$this', 5] } } } },
          4: { $size: { $filter: { input: '$ratingDistribution', cond: { $eq: ['$$this', 4] } } } },
          3: { $size: { $filter: { input: '$ratingDistribution', cond: { $eq: ['$$this', 3] } } } },
          2: { $size: { $filter: { input: '$ratingDistribution', cond: { $eq: ['$$this', 2] } } } },
          1: { $size: { $filter: { input: '$ratingDistribution', cond: { $eq: ['$$this', 1] } } } }
        }
      }
    }
  ]);
};

// Static method to get user's reviews
reviewSchema.statics.getUserReviews = function(buyerId, options = {}) {
  const { page = 1, limit = 10, status = 'active' } = options;
  const skip = (page - 1) * limit;
  
  return this.find({ buyerId, status })
    .populate('productId', 'title images price.current')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

// Static method to get reviews needing moderation
reviewSchema.statics.getReviewsForModeration = function(options = {}) {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;
  
  return this.find({
    $or: [
      { status: 'flagged' },
      { 'reported.count': { $gte: 3 } },
      { 'moderation.reviewed': false }
    ]
  })
    .populate('buyerId', 'name email')
    .populate('productId', 'title')
    .sort({ 'reported.count': -1, createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
