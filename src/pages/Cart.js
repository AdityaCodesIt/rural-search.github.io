import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import CustomerCareButton from '../components/CustomerCareButton';

const Cart = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotals, 
    isLoggedIn 
  } = useUser();
  const navigate = useNavigate();

  const totals = getCartTotals();

  const handleQuantityChange = (productId, newQuantity, variant) => {
    if (newQuantity < 1) {
      removeFromCart(productId, variant);
    } else {
      updateCartQuantity(productId, newQuantity, variant);
    }
  };

  const handleRemoveItem = (productId, variant) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(productId, variant);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/signin');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Navigate to payment with cart data
    navigate('/payment', { 
      state: { 
        cartItems: cart,
        totals: totals
      } 
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-gray mb-4">Please log in to view your cart</h2>
          <button 
            onClick={() => navigate('/signin')}
            className="bg-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-text-gray">Shopping Cart</h1>
          {cart.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-4">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-gray mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/products"
              className="bg-terracotta text-white px-6 py-3 rounded-lg hover:bg-opacity-90 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-text-gray">
                    Cart Items ({totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${JSON.stringify(item.variant)}`} className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-text-gray mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            by {item.seller?.name || 'Unknown Seller'}
                          </p>
                          {item.variant && (
                            <p className="text-sm text-gray-600 mb-2">
                              Variant: {item.variant.name} - {item.variant.value}
                            </p>
                          )}
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.variant)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.variant)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id, item.variant)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-text-gray">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="text-sm text-gray-500 line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString()}
                            </div>
                          )}
                          <div className="text-sm text-gray-600">
                            ₹{item.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-bold text-text-gray mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({totals.itemCount} items)</span>
                    <span>₹{totals.subtotal.toLocaleString()}</span>
                  </div>
                  
                  {totals.savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span>-₹{totals.savings.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {totals.shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${totals.shipping}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (GST 18%)</span>
                    <span>₹{totals.tax.toLocaleString()}</span>
                  </div>
                  
                  {totals.shipping > 0 && (
                    <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                      💡 Add ₹{(500 - totals.subtotal).toLocaleString()} more for FREE shipping!
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-terracotta">₹{totals.total.toLocaleString()}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-terracotta text-white py-3 rounded-lg hover:bg-opacity-90 font-medium mb-4"
                >
                  Proceed to Checkout
                </button>
                
                <Link
                  to="/products"
                  className="block text-center text-terracotta hover:text-opacity-80 font-medium"
                >
                  Continue Shopping
                </Link>
                
                {/* Inline Customer Care Section */}
                <div className="mt-6">
                  <CustomerCareButton position="inline" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Customer Care Button - Fixed floating button */}
      <CustomerCareButton />
    </div>
  );
};

export default Cart;
