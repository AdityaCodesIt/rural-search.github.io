const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
    uppercase: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Buyer ID is required'],
    index: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    variant: {
      name: String,
      value: String,
      additionalCost: {
        type: Number,
        default: 0
      }
    },
    customization: [{
      name: String,
      value: String,
      additionalCost: {
        type: Number,
        default: 0
      }
    }],
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    image: String,
    sku: String
  }],
  pricing: {
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    shipping: {
      type: Number,
      default: 0,
      min: 0
    },
    tax: {
      type: Number,
      default: 0,
      min: 0
    },
    discount: {
      amount: {
        type: Number,
        default: 0,
        min: 0
      },
      code: String,
      type: {
        type: String,
        enum: ['percentage', 'fixed']
      }
    },
    total: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  shippingAddress: {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    pincode: {
      type: String,
      required: true,
      trim: true
    },
    landmark: {
      type: String,
      trim: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  billingAddress: {
    fullName: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    sameAsShipping: {
      type: Boolean,
      default: true
    }
  },
  payment: {
    method: {
      type: String,
      required: true,
      enum: ['upi', 'card', 'netbanking', 'cod', 'wallet']
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
      default: 'pending',
      index: true
    },
    transactionId: String,
    paymentGateway: String,
    paidAt: Date,
    failureReason: String,
    refund: {
      amount: Number,
      reason: String,
      status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed']
      },
      refundId: String,
      processedAt: Date
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'out-for-delivery', 'delivered', 'cancelled', 'returned'],
    default: 'pending',
    index: true
  },
  tracking: {
    trackingNumber: String,
    carrier: String,
    estimatedDelivery: Date,
    actualDelivery: Date,
    updates: [{
      status: String,
      message: String,
      location: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  },
  timeline: [{
    status: {
      type: String,
      required: true
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  notes: {
    buyer: String,
    seller: String,
    admin: String
  },
  cancellation: {
    reason: String,
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    cancelledAt: Date,
    refundStatus: {
      type: String,
      enum: ['not-applicable', 'pending', 'processing', 'completed']
    }
  },
  return: {
    requested: {
      type: Boolean,
      default: false
    },
    reason: String,
    status: {
      type: String,
      enum: ['requested', 'approved', 'rejected', 'picked-up', 'completed']
    },
    requestedAt: Date,
    approvedAt: Date,
    completedAt: Date,
    refundAmount: Number
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    submittedAt: Date
  },
  metadata: {
    source: {
      type: String,
      enum: ['web', 'mobile', 'api'],
      default: 'web'
    },
    userAgent: String,
    ipAddress: String,
    referrer: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
orderSchema.index({ buyerId: 1, status: 1 });
orderSchema.index({ 'items.sellerId': 1 });
orderSchema.index({ 'items.productId': 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'shippingAddress.pincode': 1 });

// Virtual for order age in days
orderSchema.virtual('ageInDays').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for total items count
orderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for unique sellers count
orderSchema.virtual('sellersCount').get(function() {
  const uniqueSellers = new Set(this.items.map(item => item.sellerId.toString()));
  return uniqueSellers.size;
});

// Virtual for delivery status
orderSchema.virtual('deliveryStatus').get(function() {
  if (this.status === 'delivered') return 'delivered';
  if (this.status === 'out-for-delivery') return 'out-for-delivery';
  if (this.status === 'shipped') return 'shipped';
  if (this.tracking.estimatedDelivery) {
    const now = new Date();
    const estimated = new Date(this.tracking.estimatedDelivery);
    if (now > estimated) return 'delayed';
    return 'on-time';
  }
  return 'unknown';
});

// Pre-save middleware to generate order number
orderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderNumber) {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    this.orderNumber = `RR${timestamp.slice(-8)}${random}`;
  }
  
  // Calculate totals
  if (this.isModified('items') || this.isNew) {
    this.pricing.subtotal = this.items.reduce((total, item) => total + item.subtotal, 0);
    
    // Calculate tax (assuming 18% GST for now)
    this.pricing.tax = Math.round(this.pricing.subtotal * 0.18);
    
    // Calculate total
    this.pricing.total = this.pricing.subtotal + this.pricing.shipping + this.pricing.tax - this.pricing.discount.amount;
  }
  
  // Copy shipping address to billing if same
  if (this.billingAddress.sameAsShipping) {
    this.billingAddress = {
      ...this.shippingAddress,
      sameAsShipping: true
    };
  }
  
  // Add timeline entry for status changes
  if (this.isModified('status') && !this.isNew) {
    this.timeline.push({
      status: this.status,
      message: `Order status updated to ${this.status}`,
      timestamp: new Date()
    });
  }
  
  next();
});

// Instance method to add timeline entry
orderSchema.methods.addTimelineEntry = function(status, message, updatedBy = null) {
  this.timeline.push({
    status,
    message,
    timestamp: new Date(),
    updatedBy
  });
  return this.save();
};

// Instance method to update tracking
orderSchema.methods.updateTracking = function(trackingData) {
  Object.assign(this.tracking, trackingData);
  
  if (trackingData.status) {
    this.tracking.updates.push({
      status: trackingData.status,
      message: trackingData.message || `Package ${trackingData.status}`,
      location: trackingData.location,
      timestamp: new Date()
    });
  }
  
  return this.save();
};

// Instance method to cancel order
orderSchema.methods.cancelOrder = function(reason, cancelledBy) {
  this.status = 'cancelled';
  this.cancellation = {
    reason,
    cancelledBy,
    cancelledAt: new Date(),
    refundStatus: this.payment.status === 'completed' ? 'pending' : 'not-applicable'
  };
  
  this.addTimelineEntry('cancelled', `Order cancelled: ${reason}`, cancelledBy);
  return this.save();
};

// Instance method to process refund
orderSchema.methods.processRefund = function(amount, reason) {
  this.payment.refund = {
    amount: amount || this.pricing.total,
    reason,
    status: 'processing',
    processedAt: new Date()
  };
  
  this.payment.status = 'refunded';
  return this.save();
};

// Instance method to request return
orderSchema.methods.requestReturn = function(reason) {
  this.return = {
    requested: true,
    reason,
    status: 'requested',
    requestedAt: new Date()
  };
  
  this.addTimelineEntry('return-requested', `Return requested: ${reason}`);
  return this.save();
};

// Instance method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  const nonCancellableStatuses = ['shipped', 'out-for-delivery', 'delivered', 'cancelled', 'returned'];
  return !nonCancellableStatuses.includes(this.status);
};

// Instance method to check if order can be returned
orderSchema.methods.canBeReturned = function() {
  if (this.status !== 'delivered') return false;
  
  const deliveryDate = this.tracking.actualDelivery || this.updatedAt;
  const daysSinceDelivery = (Date.now() - deliveryDate) / (1000 * 60 * 60 * 24);
  
  return daysSinceDelivery <= 7; // 7 days return policy
};

// Static method to find orders by buyer
orderSchema.statics.findByBuyer = function(buyerId, status = null) {
  const query = { buyerId };
  if (status) query.status = status;
  return this.find(query).sort({ createdAt: -1 });
};

// Static method to find orders by seller
orderSchema.statics.findBySeller = function(sellerId, status = null) {
  const query = { 'items.sellerId': sellerId };
  if (status) query.status = status;
  return this.find(query).sort({ createdAt: -1 });
};

// Static method to get order statistics
orderSchema.statics.getStatistics = function(startDate, endDate) {
  const matchStage = {
    createdAt: {
      $gte: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Default: last 30 days
      $lte: endDate || new Date()
    }
  };
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$pricing.total' },
        averageOrderValue: { $avg: '$pricing.total' },
        totalItems: { $sum: { $sum: '$items.quantity' } },
        statusBreakdown: {
          $push: '$status'
        }
      }
    },
    {
      $project: {
        _id: 0,
        totalOrders: 1,
        totalRevenue: 1,
        averageOrderValue: { $round: ['$averageOrderValue', 2] },
        totalItems: 1,
        statusBreakdown: 1
      }
    }
  ]);
};

// Static method to get monthly sales data
orderSchema.statics.getMonthlySales = function(year) {
  return this.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(year, 0, 1),
          $lt: new Date(year + 1, 0, 1)
        },
        status: { $nin: ['cancelled'] }
      }
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$pricing.total' },
        averageOrderValue: { $avg: '$pricing.total' }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ]);
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
