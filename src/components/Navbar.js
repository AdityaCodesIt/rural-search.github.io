import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { user, isLoggedIn, logout, cart, getCartTotals } = useUser();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();

  const cartTotals = getCartTotals();

  const handleLogout = () => {
    const result = logout();
    if (result.success) {
      navigate('/');
      alert('Logged out successfully!');
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-terracotta">RuralReach</span>
            <span className="text-xs sm:text-sm text-leaf-green ml-1 sm:ml-2">Maharashtra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link
              to="/"
              className="text-text-gray hover:text-terracotta transition-colors text-sm lg:text-base"
            >
              {t('home')}
            </Link>
            <Link
              to="/products"
              className="text-text-gray hover:text-terracotta transition-colors text-sm lg:text-base"
            >
              {t('products')}
            </Link>
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-1 text-text-gray hover:text-terracotta transition-colors text-sm lg:text-base"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="hidden lg:inline">{availableLanguages.find(lang => lang.code === currentLanguage)?.nativeName}</span>
                </button>
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50">
                    {availableLanguages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          changeLanguage(language.code);
                          setIsLanguageOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          currentLanguage === language.code ? 'bg-terracotta text-white' : 'text-gray-700'
                        }`}
                      >
                        {language.nativeName}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isLoggedIn ? (
                <>
                  {/* Cart Icon */}
                  <Link to="/cart" className="relative text-text-gray hover:text-terracotta transition-colors">
                    <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4" />
                    </svg>
                    {cartTotals.itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center text-xs">
                        {cartTotals.itemCount}
                      </span>
                    )}
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <Link 
                      to="/profile"
                      className="flex items-center space-x-2 text-text-gray hover:text-terracotta transition-colors"
                    >
                      <div className="w-7 h-7 lg:w-8 lg:h-8 bg-terracotta rounded-full flex items-center justify-center">
                        <span className="text-white text-xs lg:text-sm font-bold">
                          {user?.fullName?.charAt(0) || user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="hidden lg:block text-sm">
                        {user?.fullName || user?.name || user?.email?.split('@')[0]}
                      </span>
                    </Link>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="bg-terracotta text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm lg:text-base"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-text-gray hover:text-terracotta transition-colors text-sm lg:text-base"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/signin"
                    className="bg-terracotta text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm lg:text-base"
                  >
                    {t('signup')}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="text-text-gray hover:text-terracotta transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg py-1 z-50">
                  {availableLanguages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        changeLanguage(language.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                        currentLanguage === language.code ? 'bg-terracotta text-white' : 'text-gray-700'
                      }`}
                    >
                      {language.nativeName}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-gray hover:text-terracotta focus:outline-none focus:text-terracotta p-1"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 max-h-screen overflow-y-auto">
              <Link
                to="/"
                className="block px-3 py-2 text-text-gray hover:text-terracotta text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 text-text-gray hover:text-terracotta text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('products')}
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/cart"
                    className="flex items-center justify-between px-3 py-2 text-text-gray hover:text-terracotta text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{t('cart')}</span>
                    {cartTotals.itemCount > 0 && (
                      <span className="bg-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartTotals.itemCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-text-gray hover:text-terracotta text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('profile')}
                  </Link>
                  <div className="px-3 py-2 text-text-gray text-sm bg-gray-50 rounded-lg mx-3 my-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-terracotta rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {user?.fullName?.charAt(0) || user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="truncate">{user?.fullName || user?.name || user?.email?.split('@')[0]}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 bg-terracotta text-white rounded-lg mx-3 mb-2 text-base font-medium"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="block px-3 py-2 text-text-gray hover:text-terracotta text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/signin"
                    className="block px-3 py-2 bg-terracotta text-white rounded-lg mx-3 text-base font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
