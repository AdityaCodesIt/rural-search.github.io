import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  // Sample data
  const orders = [
    {
      id: 'ORD001',
      product: {
        name: 'Handcrafted Sawantwadi Wooden Toys',
        image: '/images/products/sawantwadi-wooden-toys.svg',
        seller: 'Artisan Crafts Sawantwadi'
      },
      amount: 299,
      quantity: 1,
      status: 'delivered',
      orderDate: '2024-01-10',
      deliveryDate: '2024-01-15',
      trackingId: 'TRK123456789'
    },
    {
      id: 'ORD002',
      product: {
        name: 'Organic Alphonso Mangoes',
        image: '/images/products/alphonso-mangoes.svg',
        seller: 'Konkan Fresh Farms'
      },
      amount: 450,
      quantity: 1,
      status: 'shipped',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-18',
      trackingId: 'TRK987654321'
    },
    {
      id: 'ORD003',
      product: {
        name: 'Traditional Wooden Elephant Set',
        image: '/images/products/wooden-elephant-set.svg',
        seller: 'Heritage Wood Crafts'
      },
      amount: 450,
      quantity: 2,
      status: 'pending',
      orderDate: '2024-01-14',
      deliveryDate: '2024-01-20',
      trackingId: 'TRK456789123'
    }
  ];

  const wishlist = [
    {
      id: 13,
      name: 'Kidology 7-in-1 Montessori Busy Board',
      price: 699,
      originalPrice: 999,
      image: '/images/products/montessori-busy-board-kidology.webp',
      seller: 'Kidology Educational',
      inStock: true
    },
    {
      id: 8,
      name: 'Kidology Wooden Magnetic Fishing Game',
      price: 569,
      originalPrice: 795,
      image: '/images/products/magnetic-fishing-kidology.webp',
      seller: 'Kidology Crafts',
      inStock: true
    },
    {
      id: 20,
      name: 'NESTA TOYS Wooden Tool Kit Set',
      price: 1649,
      originalPrice: 2399,
      image: '/images/products/wooden-tool-kit-nesta.webp',
      seller: 'Nesta Educational Toys',
      inStock: true
    },
    {
      id: 7,
      name: 'CrafToys Wooden Spinning Tops 5 Types',
      price: 299,
      originalPrice: 399,
      image: '/images/products/spinning-tops-craftoys.webp',
      seller: 'CrafToys Sawantwadi',
      inStock: true
    },
    {
      id: 37,
      name: 'Taali Makhan Chor Wooden Figurine Stacking Toy',
      price: 1199,
      originalPrice: 1599,
      image: '/images/products/taali-makhan-chor-stacking.jpg',
      seller: 'Taali Traditional Toys',
      inStock: true
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'shipped': return '🚚';
      case 'delivered': return '✅';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  const ReviewModal = ({ order, onClose }) => {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Review submitted:', { orderId: order.id, rating, review });
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-text-gray">Write a Review</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div className="mb-4">
            <img
              src={order.product.image}
              alt={order.product.name}
              className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
            />
            <p className="text-center text-sm font-medium text-text-gray">{order.product.name}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-gray mb-2">Rating</label>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-gray mb-2">Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
                placeholder="Share your experience with this product..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-terracotta text-white rounded-md hover:bg-opacity-90"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleWriteReview = (order) => {
    setSelectedOrder(order);
    setShowReviewModal(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-text-gray">My Account</h1>
              <p className="text-gray-600">Manage your orders and preferences</p>
            </div>
            <Link
              to="/products"
              className="bg-terracotta text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-terracotta bg-opacity-10 p-3 rounded-full">
                <span className="text-terracotta text-xl">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-text-gray">{orders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-leaf-green bg-opacity-10 p-3 rounded-full">
                <span className="text-leaf-green text-xl">❤️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Wishlist Items</p>
                <p className="text-2xl font-bold text-text-gray">{wishlist.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 bg-opacity-10 p-3 rounded-full">
                <span className="text-yellow-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-text-gray">₹{orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['orders', 'wishlist', 'reviews', 'profile'].map((tab) => (
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
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-semibold text-text-gray mb-6">Order History</h3>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={order.product.image}
                            alt={order.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-text-gray">{order.product.name}</h4>
                            <p className="text-sm text-gray-600">{order.product.seller}</p>
                            <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right mt-4 md:mt-0">
                          <p className="text-lg font-bold text-terracotta">₹{order.amount}</p>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)} {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <span className="font-medium">Order ID:</span> {order.id}
                        </div>
                        <div>
                          <span className="font-medium">Order Date:</span> {order.orderDate}
                        </div>
                        <div>
                          <span className="font-medium">Delivery Date:</span> {order.deliveryDate}
                        </div>
                      </div>

                      {order.status === 'shipped' && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center">
                            <span className="text-blue-600 mr-2">🚚</span>
                            <div>
                              <p className="text-sm font-medium text-blue-800">Your order is on the way!</p>
                              <p className="text-sm text-blue-600">Tracking ID: {order.trackingId}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {order.status === 'shipped' && (
                          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                            Track Order
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button
                            onClick={() => handleWriteReview(order)}
                            className="px-4 py-2 bg-terracotta text-white rounded-lg text-sm hover:bg-opacity-90"
                          >
                            Write Review
                          </button>
                        )}
                        <Link
                          to={`/product/${order.product.id}`}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                        >
                          View Product
                        </Link>
                        {order.status === 'delivered' && (
                          <button className="px-4 py-2 bg-leaf-green text-white rounded-lg text-sm hover:bg-opacity-90">
                            Buy Again
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h3 className="text-lg font-semibold text-text-gray mb-6">My Wishlist</h3>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                              <span className="text-white font-medium">Out of Stock</span>
                            </div>
                          )}
                        </div>
                        
                        <h4 className="font-medium text-text-gray mb-2 line-clamp-2">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{item.seller}</p>
                        
                        <div className="flex items-center mb-4">
                          <span className="text-lg font-bold text-terracotta">₹{item.price}</span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link
                            to={`/product/${item.id}`}
                            className="flex-1 text-center px-3 py-2 bg-terracotta text-white rounded-lg text-sm hover:bg-opacity-90"
                          >
                            View Product
                          </Link>
                          <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">❤️</div>
                    <h3 className="text-xl font-semibold text-text-gray mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-4">Save items you love for later</p>
                    <Link
                      to="/products"
                      className="bg-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-text-gray mb-6">My Reviews</h3>
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold text-text-gray mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-4">Share your experience with products you've purchased</p>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-semibold text-text-gray mb-6">Profile Settings</h3>
                <div className="max-w-2xl">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-gray mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-gray mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-gray mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-gray mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="+91 98765 43210"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-gray mb-2">
                        Address
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="123 Main Street, Mumbai, Maharashtra 400001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-terracotta focus:border-terracotta"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="bg-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showReviewModal && selectedOrder && (
        <ReviewModal
          order={selectedOrder}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default BuyerDashboard;
