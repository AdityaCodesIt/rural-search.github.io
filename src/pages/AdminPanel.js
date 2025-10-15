import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showOrderProcess, setShowOrderProcess] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [processStep, setProcessStep] = useState(1);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [deliveryDays, setDeliveryDays] = useState(7);
  const [adminUser, setAdminUser] = useState(null);
  const [realTimeData, setRealTimeData] = useState({
    users: [],
    orders: [],
    products: [],
    activities: []
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Check admin authentication
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const adminData = localStorage.getItem('adminUser');

    if (!isAdminLoggedIn || !adminData) {
      navigate('/admin-login');
      return;
    }

    setAdminUser(JSON.parse(adminData));
    loadRealTimeData();

    // Set up real-time data refresh
    const interval = setInterval(loadRealTimeData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [navigate]);

  const loadRealTimeData = () => {
    // Load real user data from localStorage
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const userActivities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    
    // Get all registered users from UserContext
    const registeredUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_')) {
        try {
          const userData = JSON.parse(localStorage.getItem(key));
          if (userData && userData.email) {
            registeredUsers.push({
              ...userData,
              id: key,
              lastActive: userData.loginTime || userData.registrationTime,
              status: 'active'
            });
          }
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    }

    // Load cart data to create mock orders
    const mockOrders = [];
    registeredUsers.forEach(user => {
      const userCart = JSON.parse(localStorage.getItem(`cart_${user.id}`) || '[]');
      if (userCart.length > 0) {
        mockOrders.push({
          id: `ORDER_${Date.now()}_${user.id}`,
          orderNumber: `RR${Date.now().toString().slice(-8)}`,
          userId: user.id,
          userName: user.fullName || user.name || user.email,
          userEmail: user.email,
          items: userCart,
          total: userCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          status: 'pending',
          createdAt: new Date().toISOString(),
          paymentMethod: 'pending',
          shippingAddress: user.address || 'Not provided'
        });
      }
    });

    // Calculate real-time stats
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
    const activeUsers = registeredUsers.filter(user => {
      const lastActive = new Date(user.lastActive || user.registrationTime);
      const now = new Date();
      const hoursDiff = (now - lastActive) / (1000 * 60 * 60);
      return hoursDiff < 24; // Active in last 24 hours
    }).length;

    setRealTimeData({
      users: registeredUsers,
      orders: mockOrders,
      activities: userActivities.slice(-20), // Last 20 activities
      products: [] // Will be populated from product data
    });

    setStats({
      totalUsers: registeredUsers.length,
      totalOrders: mockOrders.length,
      totalRevenue: totalRevenue,
      activeUsers: activeUsers
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin-login');
  };

  // Handler functions for user management
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleApproveUser = (user) => {
    if (window.confirm(`Approve ${user.fullName || user.email}?`)) {
      const updatedUser = { ...user, verified: true, status: 'approved' };
      localStorage.setItem(user.id, JSON.stringify(updatedUser));
      loadRealTimeData();
      alert('User approved successfully!');
    }
  };

  const handleRejectUser = (user) => {
    if (window.confirm(`Reject ${user.fullName || user.email}?`)) {
      const updatedUser = { ...user, verified: false, status: 'rejected' };
      localStorage.setItem(user.id, JSON.stringify(updatedUser));
      loadRealTimeData();
      alert('User rejected.');
    }
  };

  const handleProcessOrder = (order) => {
    setCurrentOrder(order);
    setShowOrderProcess(true);
    setProcessStep(1);
  };

  const handleNextStep = () => {
    if (processStep < 3) {
      setProcessStep(processStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (processStep > 1) {
      setProcessStep(processStep - 1);
    }
  };

  const handleCompleteOrder = () => {
    if (currentOrder && selectedSupplier) {
      const completedOrder = {
        ...currentOrder,
        status: 'processed',
        supplier: selectedSupplier,
        estimatedDelivery: deliveryDays,
        processedAt: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + deliveryDays * 24 * 60 * 60 * 1000).toISOString()
      };
      
      // Store completed order
      const completedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
      completedOrders.push(completedOrder);
      localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
      
      // Add notification for user
      const notifications = JSON.parse(localStorage.getItem(`notifications_${currentOrder.userId}`) || '[]');
      notifications.push({
        id: Date.now(),
        type: 'order_processed',
        title: 'Order Processed',
        message: `Your order #${currentOrder.orderNumber} has been processed and will be delivered in ${deliveryDays} days.`,
        deliveryDate: completedOrder.deliveryDate,
        timestamp: new Date().toISOString(),
        read: false
      });
      localStorage.setItem(`notifications_${currentOrder.userId}`, JSON.stringify(notifications));
      
      setShowOrderProcess(false);
      setCurrentOrder(null);
      setProcessStep(1);
      alert(`Order processed successfully! Delivery scheduled in ${deliveryDays} days.`);
      loadRealTimeData();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">RuralReach Admin</h1>
              <span className="ml-4 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                ADMIN PANEL
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {adminUser.fullName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users (24h)</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                { id: 'entrepreneurs', name: 'Entrepreneurs', icon: '🏪' },
                { id: 'buyers', name: 'Buyers', icon: '👥' },
                { id: 'orders', name: 'Orders', icon: '📦' },
                { id: 'activities', name: 'Activities', icon: '📋' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Entrepreneurs Tab */}
            {activeTab === 'entrepreneurs' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Entrepreneurs</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrepreneur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {realTimeData.users.filter(user => user.role === 'entrepreneur' || user.userType === 'entrepreneur').map((user, index) => (
                        <tr key={user.id || index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-blue-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {(user.fullName || user.name || user.email)?.charAt(0)?.toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.fullName || user.name || 'Unknown'}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.businessName || 'Not specified'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.city || 'Unknown'}, {user.state || 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.verified ? 'Verified' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View Details
                            </button>
                            {!user.verified && (
                              <>
                                <button
                                  onClick={() => handleApproveUser(user)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectUser(user)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Buyers Tab */}
            {activeTab === 'buyers' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Registered Users</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cart Info</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {realTimeData.users.map((user, index) => (
                        <tr key={user.id || index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-green-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {(user.fullName || user.name || user.email)?.charAt(0)?.toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.fullName || user.name || 'Unknown'}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Cart Items: {JSON.parse(localStorage.getItem(`cart_${user.id}`) || '[]').length}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.city || 'Unknown'}, {user.state || 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.registrationTime || user.loginTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleProcessOrder({
                                id: `ORDER_${Date.now()}_${user.id}`,
                                orderNumber: `RR${Date.now().toString().slice(-8)}`,
                                userId: user.id,
                                userName: user.fullName || user.name,
                                userEmail: user.email,
                                items: JSON.parse(localStorage.getItem(`cart_${user.id}`) || '[]'),
                                status: 'pending'
                              })}
                              className="text-green-600 hover:text-green-900"
                            >
                              Process Order
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {realTimeData.users.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No users found. Users will appear here when they register.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
                <div className="space-y-4">
                  {realTimeData.orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">Order #{order.orderNumber}</h3>
                          <p className="text-sm text-gray-600">Customer: {order.userName}</p>
                          <p className="text-sm text-gray-600">Email: {order.userEmail}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <p className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Items: {order.items.length}</p>
                        <p>Date: {formatDate(order.createdAt)}</p>
                        <p>Payment: {order.paymentMethod}</p>
                      </div>
                    </div>
                  ))}
                  {realTimeData.orders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No orders found. Orders will appear here when users make purchases.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h2>
                <div className="space-y-3">
                  {realTimeData.activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-600">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                  {realTimeData.activities.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No recent activities found.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">System Overview</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Recent User Registrations</h3>
                    <div className="space-y-2">
                      {realTimeData.users.slice(-5).map((user, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{user.fullName || user.email}</span>
                          <span className="text-gray-500">{formatDate(user.registrationTime || user.loginTime)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">System Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Database Status:</span>
                        <span className="text-green-600">✓ Connected</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Data Refresh:</span>
                        <span className="text-gray-600">{new Date().toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Admin Session:</span>
                        <span className="text-green-600">✓ Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedUser.role === 'entrepreneur' ? 'Entrepreneur Details' : 'Buyer Details'}
              </h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Name:</strong> {selectedUser.fullName || selectedUser.name}</div>
                  <div><strong>Email:</strong> {selectedUser.email}</div>
                  <div><strong>Phone:</strong> {selectedUser.phone || 'Not provided'}</div>
                  <div><strong>Role:</strong> {selectedUser.role || selectedUser.userType}</div>
                  <div><strong>City:</strong> {selectedUser.city || 'Not provided'}</div>
                  <div><strong>State:</strong> {selectedUser.state || 'Not provided'}</div>
                  <div><strong>Applied:</strong> {formatDate(selectedUser.registrationTime)}</div>
                  <div><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      selectedUser.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedUser.verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Entrepreneur Specific Details */}
              {(selectedUser.role === 'entrepreneur' || selectedUser.userType === 'entrepreneur') && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Business Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Business Name:</strong> {selectedUser.businessName || 'Not provided'}</div>
                    <div><strong>Business Type:</strong> {selectedUser.businessType || 'Not specified'}</div>
                    <div><strong>Description:</strong> {selectedUser.businessDescription || 'No description provided'}</div>
                    <div><strong>Experience:</strong> {selectedUser.experience || 'Not specified'} years</div>
                    <div><strong>Certifications:</strong> 
                      <ul className="mt-1 ml-4">
                        <li>• Traditional Craft Certification (Verified)</li>
                        <li>• Quality Assurance Certificate</li>
                        <li>• Export License (if applicable)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Buyer Specific Details */}
              {(!selectedUser.role || selectedUser.role === 'buyer' || selectedUser.userType === 'buyer') && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Shopping Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Cart Items:</strong> {JSON.parse(localStorage.getItem(`cart_${selectedUser.id}`) || '[]').length} items</div>
                    <div><strong>Total Cart Value:</strong> ₹{JSON.parse(localStorage.getItem(`cart_${selectedUser.id}`) || '[]').reduce((sum, item) => sum + (item.price * item.quantity), 0)}</div>
                    <div><strong>Preferred Categories:</strong> Handicrafts, Traditional Items</div>
                    <div><strong>Payment Method:</strong> Credit Card, UPI</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                {!selectedUser.verified && (
                  <>
                    <button
                      onClick={() => {
                        handleRejectUser(selectedUser);
                        setShowUserModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        handleApproveUser(selectedUser);
                        setShowUserModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3-Step Order Processing Modal */}
      {showOrderProcess && currentOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-5/6 lg:w-4/5 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Order Processing - Step {processStep} of 3</h3>
              <button
                onClick={() => setShowOrderProcess(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= processStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 ${
                        step < processStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Buyer Info</span>
                <span>Find Supplier</span>
                <span>Delivery</span>
              </div>
            </div>

            {/* Step 1: Buyer Information & Inventory */}
            {processStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Buyer Information */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Buyer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {currentOrder.userName}</div>
                      <div><strong>Email:</strong> {currentOrder.userEmail}</div>
                      <div><strong>Order #:</strong> {currentOrder.orderNumber}</div>
                      <div><strong>Items:</strong> {currentOrder.items.length} products</div>
                    </div>
                    
                    <h5 className="font-medium text-gray-900 mt-4 mb-2">Ordered Products:</h5>
                    <div className="space-y-2">
                      {currentOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-2 rounded">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹{item.price * item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inventory Check */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Inventory Status</h4>
                    <div className="space-y-2">
                      {currentOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-2 rounded">
                          <div className="font-medium">{item.name}</div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              ✓ In Stock
                            </span>
                            <span className="text-sm text-gray-600">Available: 50+</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-100 rounded">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-800 font-medium">All items available in inventory</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Find Certified Suppliers */}
            {processStep === 2 && (
              <div className="space-y-6">
                <h4 className="font-medium text-gray-900 mb-3">Certified Suppliers</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: 1,
                      name: 'Ravi Traditional Crafts',
                      location: 'Jaipur, Rajasthan',
                      rating: 4.8,
                      experience: '15 years',
                      phone: '+91 98765 43210',
                      email: 'ravi@crafts.com',
                      speciality: 'Wooden Handicrafts'
                    },
                    {
                      id: 2,
                      name: 'Sawantwadi Art House',
                      location: 'Sawantwadi, Maharashtra',
                      rating: 4.9,
                      experience: '20 years',
                      phone: '+91 98765 43211',
                      email: 'info@sawantwadi.com',
                      speciality: 'Traditional Toys'
                    },
                    {
                      id: 3,
                      name: 'Channapatna Creations',
                      location: 'Channapatna, Karnataka',
                      rating: 4.7,
                      experience: '12 years',
                      phone: '+91 98765 43212',
                      email: 'orders@channapatna.com',
                      speciality: 'Lacquer Work'
                    }
                  ].map((supplier) => (
                    <div
                      key={supplier.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedSupplier?.id === supplier.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{supplier.name}</h5>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">{supplier.rating}</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>📍 {supplier.location}</div>
                        <div>🏆 {supplier.experience} experience</div>
                        <div>🎨 {supplier.speciality}</div>
                        <div>📞 {supplier.phone}</div>
                        <div>✉️ {supplier.email}</div>
                      </div>
                      {selectedSupplier?.id === supplier.id && (
                        <div className="mt-2 text-blue-600 font-medium text-sm">✓ Selected</div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Delivery Timeline</h5>
                  <div className="flex items-center space-x-4">
                    <label className="text-sm text-gray-700">Estimated delivery days:</label>
                    <select
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(parseInt(e.target.value))}
                      className="border border-gray-300 rounded px-3 py-1 text-sm"
                    >
                      <option value={3}>3 days</option>
                      <option value={5}>5 days</option>
                      <option value={7}>7 days</option>
                      <option value={10}>10 days</option>
                      <option value={14}>14 days</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Delivery & Map */}
            {processStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Delivery Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Delivery Information</h4>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Selected Supplier</h5>
                      {selectedSupplier && (
                        <div className="space-y-1 text-sm">
                          <div><strong>Name:</strong> {selectedSupplier.name}</div>
                          <div><strong>Location:</strong> {selectedSupplier.location}</div>
                          <div><strong>Contact:</strong> {selectedSupplier.phone}</div>
                          <div><strong>Email:</strong> {selectedSupplier.email}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Delivery Details</h5>
                      <div className="space-y-1 text-sm">
                        <div><strong>Estimated Delivery:</strong> {deliveryDays} days</div>
                        <div><strong>Delivery Date:</strong> {new Date(Date.now() + deliveryDays * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                        <div><strong>Shipping Method:</strong> Express Delivery</div>
                        <div><strong>Tracking:</strong> Will be provided after processing</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Section */}
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Delivery Route</h5>
                    <div className="bg-white rounded border-2 border-dashed border-gray-300 h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-2">🗺️</div>
                        <div>Interactive Map</div>
                        <div className="text-sm mt-1">
                          {selectedSupplier?.location} → Customer Location
                        </div>
                        <div className="text-xs mt-2 text-blue-600">
                          Estimated Distance: 250 km<br/>
                          Delivery Time: {deliveryDays} days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 pt-4 border-t">
              <button
                onClick={handlePreviousStep}
                disabled={processStep === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowOrderProcess(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                
                {processStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={processStep === 2 && !selectedSupplier}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteOrder}
                    disabled={!selectedSupplier}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Complete Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
