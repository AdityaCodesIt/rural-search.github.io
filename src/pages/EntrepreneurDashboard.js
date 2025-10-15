import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EntrepreneurDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Sample data
  const dashboardStats = {
    totalProducts: 6,
    totalOrders: 185,
    totalRevenue: 45600,
    pendingOrders: 12,
    verificationStatus: 'verified'
  };

  const recentOrders = [
    {
      id: 'ORD001',
      product: 'Sawantwadi Wooden Toys',
      customer: 'Priya Sharma',
      amount: 299,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'ORD002',
      product: 'Traditional Elephant Set',
      customer: 'Rajesh Kumar',
      amount: 450,
      status: 'shipped',
      date: '2024-01-14'
    },
    {
      id: 'ORD003',
      product: 'Warli Art Toys',
      customer: 'Anita Desai',
      amount: 380,
      status: 'delivered',
      date: '2024-01-12'
    }
  ];

  const products = [
    {
      id: 1,
      name: 'Handcrafted Sawantwadi Wooden Toys',
      price: 299,
      stock: 25,
      status: 'active',
      views: 1250,
      sales: 45,
      image: '/images/products/sawantwadi-wooden-toys.svg'
    },
    {
      id: 2,
      name: 'Traditional Wooden Elephant Set',
      price: 450,
      stock: 15,
      status: 'active',
      views: 890,
      sales: 23,
      image: '/images/products/wooden-elephant-set-real.webp'
    },
    {
      id: 7,
      name: 'CrafToys Wooden Spinning Tops 5 Types',
      price: 299,
      stock: 15,
      status: 'active',
      views: 780,
      sales: 32,
      image: '/images/products/spinning-tops-craftoys.webp'
    },
    {
      id: 10,
      name: 'Nesta Toys Wooden Bread Pop-up Toaster',
      price: 1186,
      stock: 12,
      status: 'active',
      views: 650,
      sales: 18,
      image: '/images/products/wooden-toaster-nesta.webp'
    },
    {
      id: 31,
      name: 'GUBBACHHI Wooden Stacker Toy Gateway of India',
      price: 899,
      stock: 12,
      status: 'active',
      views: 520,
      sales: 23,
      image: '/images/products/gubbachhi-wooden-stacker.webp'
    },
    {
      id: 22,
      name: 'WudCraft Wooden Spinning Tops Combo',
      price: 198,
      stock: 0,
      status: 'out_of_stock',
      views: 380,
      sales: 45,
      image: '/images/placeholder.svg'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const AddProductForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: '',
      description: '',
      price: '',
      stock: '',
      images: []
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Adding product:', formData);
      setShowAddProduct(false);
      // Add product logic here
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text-gray">Add New Product</h2>
            <button
              onClick={() => setShowAddProduct(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-gray mb-1">
                Product Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-gray mb-1">
                Category
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
              >
                <option value="">Select Category</option>
                <option value="handicrafts">Handicrafts</option>
                <option value="agro-products">Agro Products</option>
                <option value="textiles">Textiles</option>
                <option value="local-foods">Local Foods</option>
                <option value="services">Services</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-gray mb-1">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
                placeholder="Describe your product..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-gray mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-gray mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-gray mb-1">
                Product Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <div className="text-gray-400 mb-2">📷</div>
                <p className="text-sm text-gray-600">Click to upload images or drag and drop</p>
                <input type="file" multiple accept="image/*" className="hidden" />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setShowAddProduct(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-terracotta text-white rounded-md hover:bg-opacity-90"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-text-gray">Entrepreneur Dashboard</h1>
              <p className="text-gray-600">Manage your products and orders</p>
            </div>
            <div className="flex items-center space-x-4">
              {dashboardStats.verificationStatus === 'verified' && (
                <span className="bg-leaf-green text-white px-3 py-1 rounded-full text-sm">
                  ✓ Verified Seller
                </span>
              )}
              <button
                onClick={() => setShowAddProduct(true)}
                className="bg-terracotta text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-terracotta bg-opacity-10 p-3 rounded-full">
                <span className="text-terracotta text-xl">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-text-gray">{dashboardStats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-leaf-green bg-opacity-10 p-3 rounded-full">
                <span className="text-leaf-green text-xl">🛒</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-text-gray">{dashboardStats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 bg-opacity-10 p-3 rounded-full">
                <span className="text-yellow-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-text-gray">₹{dashboardStats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 bg-opacity-10 p-3 rounded-full">
                <span className="text-blue-600 text-xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-text-gray">{dashboardStats.pendingOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'products', 'orders', 'analytics'].map((tab) => (
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-gray mb-4">Recent Orders</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-gray">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {order.product}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {order.customer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ₹{order.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {order.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-text-gray">My Products</h3>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="bg-terracotta text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                  >
                    Add New Product
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-text-gray mb-1">{product.name}</h4>
                          <p className="text-lg font-bold text-terracotta">₹{product.price}</p>
                          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Views: {product.views}</span>
                          <span>Sales: {product.sales}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 text-xs bg-gray-100 text-gray-700 py-1 px-2 rounded hover:bg-gray-200">
                            Edit
                          </button>
                          <button className="flex-1 text-xs bg-red-100 text-red-700 py-1 px-2 rounded hover:bg-red-200">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-semibold text-text-gray mb-6">All Orders</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-text-gray">{order.id}</div>
                              <div className="text-sm text-gray-500">{order.product}</div>
                              <div className="text-sm font-medium text-terracotta">₹{order.amount}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-terracotta hover:text-opacity-80 mr-3">
                              View
                            </button>
                            {order.status === 'pending' && (
                              <button className="text-leaf-green hover:text-opacity-80">
                                Ship
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-text-gray mb-6">Product Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-text-gray mb-4">Top Performing Products</h4>
                    <div className="space-y-3">
                      {products.slice(0, 3).map((product, index) => (
                        <div key={product.id} className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{product.name}</span>
                          <span className="text-sm font-medium text-terracotta">{product.sales} sales</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-text-gray mb-4">Monthly Revenue</h4>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-terracotta mb-2">₹{dashboardStats.totalRevenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">This month</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddProduct && <AddProductForm />}
    </div>
  );
};

export default EntrepreneurDashboard;
