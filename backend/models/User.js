const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  role: {
    type: String,
    enum: ['buyer', 'entrepreneur', 'admin'],
    default: 'buyer',
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  location: {
    address: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    pincode: {
      type: String,
      trim: true,
      match: [/^[1-9][0-9]{5}$/, 'Please enter a valid pincode']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  profile: {
    avatar: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say']
    }
  },
  businessInfo: {
    businessName: {
      type: String,
      trim: true
    },
    businessType: {
      type: String,
      enum: ['handicrafts', 'textiles', 'agro-products', 'local-foods', 'other']
    },
    gstNumber: {
      type: String,
      trim: true,
      match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Please enter a valid GST number']
    },
    yearsInBusiness: {
      type: Number,
      min: 0,
      max: 100
    },
    description: {
      type: String,
      maxlength: [1000, 'Business description cannot exceed 1000 characters']
    },
    specialties: [{
      type: String,
      trim: true
    }],
    certifications: [{
      name: String,
      issuedBy: String,
      issuedDate: Date,
      expiryDate: Date,
      certificateUrl: String
    }]
  },
  preferences: {
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'hi', 'mr', 'gu', 'ta', 'te', 'kn', 'ml']
    },
    currency: {
      type: String,
      default: 'INR'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  },
  statistics: {
    totalOrders: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    totalSales: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      count: {
        type: Number,
        default: 0
      }
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending'],
    default: 'pending'
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ verified: 1 });
userSchema.index({ status: 1 });
userSchema.index({ 'location.city': 1 });
userSchema.index({ 'location.state': 1 });
userSchema.index({ createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Virtual for business display name
userSchema.virtual('displayName').get(function() {
  if (this.role === 'entrepreneur' && this.businessInfo.businessName) {
    return this.businessInfo.businessName;
  }
  return this.name;
});

// Virtual for user age
userSchema.virtual('age').get(function() {
  if (this.profile.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.profile.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return null;
});

// Pre-save middleware to hash password if provided
userSchema.pre('save', async function(next) {
  // Update lastLogin on save
  if (this.isNew) {
    this.lastLogin = new Date();
  }
  
  next();
});

// Instance method to check if user is entrepreneur
userSchema.methods.isEntrepreneur = function() {
  return this.role === 'entrepreneur';
};

// Instance method to check if user is admin
userSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

// Instance method to check if user is verified
userSchema.methods.isVerified = function() {
  return this.verified === true;
};

// Instance method to get user's full location
userSchema.methods.getFullLocation = function() {
  const { address, city, state, pincode } = this.location;
  const parts = [address, city, state, pincode].filter(Boolean);
  return parts.join(', ');
};

// Static method to find users by role
userSchema.statics.findByRole = function(role) {
  return this.find({ role });
};

// Static method to find verified users
userSchema.statics.findVerified = function() {
  return this.find({ verified: true });
};

// Static method to find users by location
userSchema.statics.findByLocation = function(city, state) {
  const query = {};
  if (city) query['location.city'] = new RegExp(city, 'i');
  if (state) query['location.state'] = new RegExp(state, 'i');
  return this.find(query);
};

// Method to update user statistics
userSchema.methods.updateStatistics = async function(updateData) {
  Object.keys(updateData).forEach(key => {
    if (this.statistics[key] !== undefined) {
      this.statistics[key] = updateData[key];
    }
  });
  return this.save();
};

// Method to add certification
userSchema.methods.addCertification = function(certification) {
  this.businessInfo.certifications.push(certification);
  return this.save();
};

// Method to remove certification
userSchema.methods.removeCertification = function(certificationId) {
  this.businessInfo.certifications.id(certificationId).remove();
  return this.save();
};

// Transform output to remove sensitive fields
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  
  // Remove sensitive fields
  delete userObject.__v;
  
  // Remove firebaseUID for non-admin users
  if (this.role !== 'admin') {
    delete userObject.firebaseUID;
  }
  
  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
