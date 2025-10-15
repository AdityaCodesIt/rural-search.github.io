import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize user state from localStorage
  useEffect(() => {
    const initializeUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        const storedCart = localStorage.getItem('cart');

        if (storedLoginStatus === 'true' && storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsLoggedIn(true);
        }

        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error initializing user state:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('cart');
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, loading]);

  // Login function
  const login = async (userData) => {
    try {
      // In a real app, this would make an API call to authenticate
      const userWithTimestamp = {
        ...userData,
        loginTime: new Date().toISOString(),
        id: userData.id || `user_${Date.now()}`, // Generate ID if not provided
      };

      setUser(userWithTimestamp);
      setIsLoggedIn(true);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userWithTimestamp));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Store user data for admin access
      localStorage.setItem(userWithTimestamp.id, JSON.stringify(userWithTimestamp));

      // Log activity (in real app, send to backend)
      logActivity('login', 'User logged in successfully');

      return { success: true, user: userWithTimestamp };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // In a real app, this would make an API call to create user
      const newUser = {
        ...userData,
        id: `user_${Date.now()}`, // Generate unique ID
        registrationTime: new Date().toISOString(),
        verified: false,
        status: 'active',
        totalOrders: 0,
        totalSpent: 0,
      };

      setUser(newUser);
      setIsLoggedIn(true);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Store user data for admin access
      localStorage.setItem(newUser.id, JSON.stringify(newUser));

      // Log activity
      logActivity('register', 'User registered successfully');

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Log activity before clearing user data
      if (user) {
        logActivity('logout', 'User logged out');
      }

      setUser(null);
      setIsLoggedIn(false);
      setCart([]); // Clear cart on logout
      
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('cart');

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Update user profile
  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = {
        ...user,
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Log activity
      logActivity('profile_update', 'User profile updated');

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  };

  // Add item to cart
  const addToCart = (product, quantity = 1, variant = null) => {
    try {
      const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
      );

      let updatedCart;
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        updatedCart = cart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          seller: product.seller,
          quantity,
          variant,
          addedAt: new Date().toISOString(),
        };
        updatedCart = [...cart, cartItem];
      }

      setCart(updatedCart);
      
      // Log activity
      logActivity('cart_updated', `Added ${product.name} to cart`);

      return { success: true, cart: updatedCart };
    } catch (error) {
      console.error('Add to cart error:', error);
      return { success: false, error: error.message };
    }
  };

  // Remove item from cart
  const removeFromCart = (productId, variant = null) => {
    try {
      const updatedCart = cart.filter(item => 
        !(item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant))
      );
      
      setCart(updatedCart);
      
      // Log activity
      logActivity('cart_updated', 'Removed item from cart');

      return { success: true, cart: updatedCart };
    } catch (error) {
      console.error('Remove from cart error:', error);
      return { success: false, error: error.message };
    }
  };

  // Update cart item quantity
  const updateCartQuantity = (productId, quantity, variant = null) => {
    try {
      if (quantity <= 0) {
        return removeFromCart(productId, variant);
      }

      const updatedCart = cart.map(item => 
        item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
          ? { ...item, quantity }
          : item
      );
      
      setCart(updatedCart);
      
      // Log activity
      logActivity('cart_updated', 'Updated cart item quantity');

      return { success: true, cart: updatedCart };
    } catch (error) {
      console.error('Update cart quantity error:', error);
      return { success: false, error: error.message };
    }
  };

  // Clear entire cart
  const clearCart = () => {
    try {
      setCart([]);
      
      // Log activity
      logActivity('cart_updated', 'Cart cleared');

      return { success: true };
    } catch (error) {
      console.error('Clear cart error:', error);
      return { success: false, error: error.message };
    }
  };

  // Get cart totals
  const getCartTotals = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const savings = cart.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price;
      return total + ((originalPrice - item.price) * item.quantity);
    }, 0);

    return {
      subtotal,
      itemCount,
      savings,
      shipping: subtotal > 500 ? 0 : 50, // Free shipping over ₹500
      tax: Math.round(subtotal * 0.18), // 18% GST
      total: subtotal + (subtotal > 500 ? 0 : 50) + Math.round(subtotal * 0.18)
    };
  };

  // Log user activity (in real app, send to backend)
  const logActivity = (activityType, description) => {
    if (!user) return;

    const activity = {
      userId: user.id,
      activityType,
      description,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1', // In real app, get actual IP
      userAgent: navigator.userAgent,
    };

    // Store in localStorage for demo (in real app, send to backend)
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    activities.push(activity);
    localStorage.setItem('userActivities', JSON.stringify(activities.slice(-100))); // Keep last 100 activities
  };

  // Get user activities
  const getUserActivities = () => {
    if (!user) return [];
    
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    return activities.filter(activity => activity.userId === user.id);
  };

  // Get user orders (mock data for demo)
  const getUserOrders = () => {
    if (!user) return [];

    // Mock orders data (in real app, fetch from backend)
    return [
      {
        id: 'RR001',
        orderNumber: 'RR20241001001',
        date: '2024-01-15',
        status: 'delivered',
        total: 1449.48,
        items: [
          {
            id: 31,
            name: 'GUBBACHHI Wooden Stacker Toy',
            price: 899,
            quantity: 1,
            image: '/images/products/gubbachhi-wooden-stacker.webp'
          }
        ]
      },
      {
        id: 'RR002',
        orderNumber: 'RR20241002002',
        date: '2024-01-10',
        status: 'shipped',
        total: 874.82,
        items: [
          {
            id: 32,
            name: 'UGears Date Navigator DIY Kit',
            price: 2499,
            quantity: 1,
            image: '/images/products/ugears-date-navigator.jpg'
          }
        ]
      }
    ];
  };

  const value = {
    // User state
    user,
    isLoggedIn,
    loading,
    
    // User actions
    login,
    register,
    logout,
    updateProfile,
    
    // Cart state
    cart,
    
    // Cart actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotals,
    
    // User data
    getUserActivities,
    getUserOrders,
    
    // Utility
    logActivity,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
