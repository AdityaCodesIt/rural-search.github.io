import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data
  const dashboardStats = {
    totalUsers: 1250,
    totalEntrepreneurs: 340,
    totalProducts: 930,
    pendingApprovals: 18,
    monthlyRevenue: 145000,
    totalOrders: 2580
  };

  const pendingEntrepreneurs = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      businessName: 'Traditional Crafts Kolhapur',
      location: 'Kolhapur, Maharashtra',
      category: 'Handicrafts',
      documents: ['Aadhar', 'Business License', 'Bank Details'],
      appliedDate: '2024-01-10',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Sunita Patil',
      businessName: 'Organic Farm Products',
      location: 'Nashik, Maharashtra',
      category: 'Agro Products',
      documents: ['Aadhar', 'Organic Certificate', 'Bank Details'],
      appliedDate: '2024-01-12',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Mahesh Desai',
      businessName: 'Warli Art Studio',
      location: 'Thane, Maharashtra',
      category: 'Handicrafts',
      documents: ['Aadhar', 'Art Certificate'],
      appliedDate: '2024-01-14',
      status: 'pending'
    }
  ];

  const pendingProducts = [
    {
      id: 1,
      name: 'UGears Date Navigator DIY Kit',
      seller: 'UGears India',
      category: 'Handicrafts',
      price: 2499,
      submittedDate: '2024-01-13',
      status: 'pending',
      image: '/images/products/ugears-date-navigator.jpg'
    },
    {
      id: 2,
      name: 'Novo Baby Wooden Learning ABCD Board',
      seller: 'Novo Educational Toys',
      category: 'Handicrafts',
      price: 252,
      submittedDate: '2024-01-14',
      status: 'pending',
      image: '/images/products/abcd-learning-novo.webp'
    },
    {
      id: 3,
      name: 'Channapatna Wooden Peg Dolls',
      seller: 'Channapatna Toys',
      category: 'Handicrafts',
      price: 699,
      submittedDate: '2024-01-15',
      status: 'pending',
      image: '/images/products/channapatna-dolls-crafts.webp'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'user_registration',
      description: 'New buyer registered: Priya Sharma',
      timestamp: '2024-01-15 10:30 AM'
    },
    {
      id: 2,
      type: 'product_approved',
      description: 'Product approved: Sawantwadi Wooden Toys',
      timestamp: '2024-01-15 09:15 AM'
    },
    {
      id: 3,
      type: 'entrepreneur_approved',
      description: 'Entrepreneur verified: Artisan Crafts Sawantwadi',
      timestamp: '2024-01-14 04:20 PM'
    },
    {
      id: 4,
      type: 'order_completed',
      description: 'Order completed: ORD001 - ₹299',
      timestamp: '2024-01-14 02:45 PM'
    }
  ];

  const handleApproveEntrepreneur = (id, action) => {
    console.log(`${action} entrepreneur with ID: ${id}`);
    // Handle approval/rejection logic
  };

  const handleApproveProduct = (id, action) => {
    console.log(`${action} product with ID: ${id}`);
    // Handle approval/rejection logic
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration': return '👤';
      case 'product_approved': return '✅';
      case 'entrepreneur_approved': return '🏪';
      case 'order_completed': return '📦';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-text-gray">Admin Dashboard</h1>
              <p className="text-gray-600">RuralReach Platform Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm">
                Admin Access
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 bg-opacity-10 p-3 rounded-full">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-text-gray">{dashboardStats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-terracotta bg-opacity-10 p-3 rounded-full">
                <span className="text-terracotta text-xl">🏪</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Entrepreneurs</p>
                <p className="text-2xl font-bold text-text-gray">{dashboardStats.totalEntrepreneurs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-leaf-green bg-opacity-10 p-3 rounded-full">
                <span className="text-leaf-green text-xl">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Products</p>
                <p className="text-2xl font-bold text-text-gray">{dashboardStats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 bg-opacity-10 p-3 rounded-full">
                <span className="text-yellow-600 text-xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-text-gray">{dashboardStats.pendingApprovals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-500 bg-opacity-10 p-3 rounded-full">
                <span className="text-green-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-text-gray">₹{(dashboardStats.monthlyRevenue / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-500 bg-opacity-10 p-3 rounded-full">
                <span className="text-purple-600 text-xl">🛒</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Orders</p>
                <p className="text-2xl font-bold text-text-gray">{dashboardStats.totalOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'entrepreneurs', 'products', 'reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-terracotta text-terracotta'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-text-gray mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-gray">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-text-gray mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                      onClick={() => setActiveTab('entrepreneurs')}
                      className="p-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 text-center"
                    >
                      <div className="text-2xl mb-2">🏪</div>
                      <div className="text-sm font-medium">Review Entrepreneurs</div>
                      <div className="text-xs opacity-90">{pendingEntrepreneurs.length} pending</div>
                    </button>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="p-4 bg-leaf-green text-white rounded-lg hover:bg-opacity-90 text-center"
                    >
                      <div className="text-2xl mb-2">📦</div>
                      <div className="text-sm font-medium">Review Products</div>
                      <div className="text-xs opacity-90">{pendingProducts.length} pending</div>
                    </button>
                    <button
                      onClick={() => setActiveTab('reports')}
                      className="p-4 bg-blue-600 text-white rounded-lg hover:bg-opacity-90 text-center"
                    >
                      <div className="text-2xl mb-2">📊</div>
                      <div className="text-sm font-medium">View Reports</div>
                      <div className="text-xs opacity-90">Analytics</div>
                    </button>
                    <button className="p-4 bg-yellow-600 text-white rounded-lg hover:bg-opacity-90 text-center">
                      <div className="text-2xl mb-2">⚙️</div>
                      <div className="text-sm font-medium">Settings</div>
                      <div className="text-xs opacity-90">Platform Config</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'entrepreneurs' && (
              <div>
                <h3 className="text-lg font-semibold text-text-gray mb-6">Entrepreneur Applications</h3>
                <div className="space-y-6">
                  {pendingEntrepreneurs.map((entrepreneur) => (
                    <div key={entrepreneur.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="text-lg font-medium text-text-gray">{entrepreneur.name}</h4>
                            <span className="ml-3 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                              Pending Review
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Business:</strong> {entrepreneur.businessName}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Location:</strong> {entrepreneur.location}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Category:</strong> {entrepreneur.category}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            <strong>Applied:</strong> {entrepreneur.appliedDate}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-gray-600">Documents:</span>
                            {entrepreneur.documents.map((doc, index) => (
                              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                ✓ {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-3 mt-4 lg:mt-0">
                          <button
                            onClick={() => handleApproveEntrepreneur(entrepreneur.id, 'approve')}
                            className="px-4 py-2 bg-leaf-green text-white rounded-lg hover:bg-opacity-90"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproveEntrepreneur(entrepreneur.id, 'reject')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-opacity-90"
                          >
                            Reject
                          </button>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h3 className="text-lg font-semibold text-text-gray mb-6">Product Approvals</h3>
                <div className="space-y-6">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="text-lg font-medium text-text-gray">{product.name}</h4>
                            <span className="ml-3 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                              Pending Review
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Seller:</strong> {product.seller}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Category:</strong> {product.category}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Price:</strong> ₹{product.price}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Submitted:</strong> {product.submittedDate}
                          </p>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleApproveProduct(product.id, 'approve')}
                            className="px-4 py-2 bg-leaf-green text-white rounded-lg hover:bg-opacity-90"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproveProduct(product.id, 'reject')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-opacity-90"
                          >
                            Reject
                          </button>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <h3 className="text-lg font-semibold text-text-gray mb-6">Platform Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-text-gray mb-4">Monthly Growth</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">New Users</span>
                        <span className="text-sm font-medium text-green-600">+15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">New Entrepreneurs</span>
                        <span className="text-sm font-medium text-green-600">+22%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Products Listed</span>
                        <span className="text-sm font-medium text-green-600">+18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Revenue</span>
                        <span className="text-sm font-medium text-green-600">+25%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-text-gray mb-4">Top Categories</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Handicrafts</span>
                        <span className="text-sm font-medium text-terracotta">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Agro Products</span>
                        <span className="text-sm font-medium text-terracotta">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Textiles</span>
                        <span className="text-sm font-medium text-terracotta">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Local Foods</span>
                        <span className="text-sm font-medium text-terracotta">12%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-text-gray mb-4">Regional Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sindhudurg</span>
                        <span className="text-sm font-medium text-leaf-green">85 sellers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ratnagiri</span>
                        <span className="text-sm font-medium text-leaf-green">67 sellers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Aurangabad</span>
                        <span className="text-sm font-medium text-leaf-green">54 sellers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Kolhapur</span>
                        <span className="text-sm font-medium text-leaf-green">43 sellers</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-text-gray mb-4">Platform Health</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Users</span>
                        <span className="text-sm font-medium text-blue-600">89%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Order Success Rate</span>
                        <span className="text-sm font-medium text-blue-600">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Customer Satisfaction</span>
                        <span className="text-sm font-medium text-blue-600">4.7/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Verified Sellers</span>
                        <span className="text-sm font-medium text-blue-600">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
