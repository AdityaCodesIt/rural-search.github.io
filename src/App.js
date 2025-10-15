import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ProductListings from './pages/ProductListings';
import ProductDetails from './pages/ProductDetails';
import EntrepreneurDashboard from './pages/EntrepreneurDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Payment from './pages/Payment';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
        <div className="min-h-screen bg-cream flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/products" element={<ProductListings />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/entrepreneur-dashboard" element={<EntrepreneurDashboard />} />
              <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminPanel />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
