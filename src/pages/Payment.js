import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomerCareButton from '../components/CustomerCareButton';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity = 1 } = location.state || {};
  
  const [step, setStep] = useState(1);
  const [addressData, setAddressData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    bankName: ''
  });

  const totalAmount = product ? product.price * quantity : 0;
  const deliveryCharge = 50;
  const finalAmount = totalAmount + deliveryCharge;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (Object.values(addressData).every(field => field.trim() !== '')) {
      setStep(2);
    } else {
      alert('Please fill all address fields');
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    alert('Payment Successful! Order placed successfully.');
    navigate('/');
  };

  const handleAddressChange = (field, value) => {
    setAddressData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-gray mb-4">No product selected</h2>
          <button 
            onClick={() => navigate('/products')}
            className="bg-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-terracotta' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-terracotta text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Address</span>
            </div>
            <div className="w-16 h-1 bg-gray-300">
              <div className={`h-full ${step >= 2 ? 'bg-terracotta' : 'bg-gray-300'} transition-all duration-300`}></div>
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-terracotta' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-terracotta text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-bold text-text-gray mb-4">Order Summary</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-text-gray text-sm">{product.name}</h4>
                  <p className="text-sm text-gray-600">Qty: {quantity}</p>
                  <p className="text-sm font-medium text-terracotta">₹{product.price}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery:</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="text-terracotta">₹{finalAmount}</span>
                </div>
              </div>
              
              {/* Inline Customer Care Section */}
              <div className="mt-6">
                <CustomerCareButton position="inline" className="w-full" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-text-gray mb-6">Delivery Address</h2>
                
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-gray mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={addressData.fullName}
                        onChange={(e) => handleAddressChange('fullName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-gray mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={addressData.phone}
                        onChange={(e) => handleAddressChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-gray mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={addressData.email}
                      onChange={(e) => handleAddressChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-gray mb-1">Address *</label>
                    <textarea
                      value={addressData.address}
                      onChange={(e) => handleAddressChange('address', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-gray mb-1">City *</label>
                      <input
                        type="text"
                        value={addressData.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-gray mb-1">State *</label>
                      <select
                        value={addressData.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-gray mb-1">Pincode *</label>
                      <input
                        type="text"
                        value={addressData.pincode}
                        onChange={(e) => handleAddressChange('pincode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-gray mb-1">Landmark (Optional)</label>
                    <input
                      type="text"
                      value={addressData.landmark}
                      onChange={(e) => handleAddressChange('landmark', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-terracotta text-white rounded-lg hover:bg-opacity-90"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-text-gray mb-6">Payment Method</h2>
                
                {/* Payment Method Selection */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-terracotta bg-orange-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">📱</div>
                        <div>
                          <div className="font-medium">UPI</div>
                          <div className="text-sm text-gray-600">Pay using UPI ID</div>
                        </div>
                      </div>
                    </label>
                    
                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-terracotta bg-orange-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">💳</div>
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-600">Visa, Mastercard, etc.</div>
                        </div>
                      </div>
                    </label>
                    
                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'netbanking' ? 'border-terracotta bg-orange-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === 'netbanking'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🏦</div>
                        <div>
                          <div className="font-medium">Net Banking</div>
                          <div className="text-sm text-gray-600">All major banks</div>
                        </div>
                      </div>
                    </label>
                    
                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-terracotta bg-orange-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">💰</div>
                        <div>
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-sm text-gray-600">Pay when you receive</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Details Form */}
                <form onSubmit={handlePaymentSubmit}>
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-gray mb-1">UPI ID</label>
                        <input
                          type="text"
                          value={paymentDetails.upiId}
                          onChange={(e) => handlePaymentChange('upiId', e.target.value)}
                          placeholder="example@paytm"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-gray mb-1">Card Number</label>
                        <input
                          type="text"
                          value={paymentDetails.cardNumber}
                          onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-gray mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={paymentDetails.cardHolderName}
                          onChange={(e) => handlePaymentChange('cardHolderName', e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-gray mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={paymentDetails.expiryDate}
                            onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-gray mb-1">CVV</label>
                          <input
                            type="text"
                            value={paymentDetails.cvv}
                            onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-gray mb-1">Select Bank</label>
                        <select
                          value={paymentDetails.bankName}
                          onChange={(e) => handlePaymentChange('bankName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                          required
                        >
                          <option value="">Choose your bank</option>
                          <option value="SBI">State Bank of India</option>
                          <option value="HDFC">HDFC Bank</option>
                          <option value="ICICI">ICICI Bank</option>
                          <option value="Axis">Axis Bank</option>
                          <option value="PNB">Punjab National Bank</option>
                          <option value="BOB">Bank of Baroda</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="text-yellow-600">ℹ️</div>
                        <div>
                          <div className="font-medium text-yellow-800">Cash on Delivery</div>
                          <div className="text-sm text-yellow-700">You can pay in cash when your order is delivered to your doorstep.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Back to Address
                    </button>
                    <button
                      type="submit"
                      disabled={!paymentMethod}
                      className="px-6 py-2 bg-terracotta text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Place Order - ₹{finalAmount}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Customer Care Button - Fixed floating button */}
      <CustomerCareButton />
    </div>
  );
};

export default Payment;
