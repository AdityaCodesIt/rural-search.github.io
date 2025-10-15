import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const categories = [
    {
      id: 1,
      name: 'Handicrafts',
      description: 'Traditional handmade crafts',
      icon: '🎨',
      count: '150+ products'
    },
    {
      id: 2,
      name: 'Agro Products',
      description: 'Fresh farm produce',
      icon: '🌾',
      count: '200+ products'
    },
    {
      id: 3,
      name: 'Textiles',
      description: 'Handwoven fabrics',
      icon: '🧵',
      count: '80+ products'
    },
    {
      id: 4,
      name: 'Local Foods',
      description: 'Traditional delicacies',
      icon: '🍯',
      count: '120+ products'
    },
    {
      id: 5,
      name: 'Services',
      description: 'Local services',
      icon: '🛠️',
      count: '50+ services'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Handcrafted Sawantwadi Wooden Toys',
      price: '₹299',
      image: '/images/products/sawantwadi-wooden-toys.svg',
      seller: 'Artisan Crafts Sawantwadi',
      verified: true,
      location: 'Sawantwadi, Sindhudurg'
    },
    {
      id: 7,
      name: 'CrafToys Wooden Spinning Tops 5 Types',
      price: '₹299',
      image: '/images/products/spinning-tops-craftoys.webp',
      seller: 'CrafToys Sawantwadi',
      verified: true,
      location: 'Sawantwadi, Sindhudurg'
    },
    {
      id: 10,
      name: 'Nesta Toys Wooden Bread Pop-up Toaster',
      price: '₹1,186',
      image: '/images/products/wooden-toaster-nesta.webp',
      seller: 'Nesta Toys',
      verified: true,
      location: 'Sawantwadi, Sindhudurg'
    },
    {
      id: 13,
      name: 'Kidology 7-in-1 Montessori Busy Board',
      price: '₹699',
      image: '/images/products/montessori-busy-board-kidology.webp',
      seller: 'Kidology Educational',
      verified: true,
      location: 'Sawantwadi, Sindhudurg'
    },
    {
      id: 31,
      name: 'GUBBACHHI Wooden Stacker Toy Gateway of India',
      price: '₹899',
      image: '/images/products/gubbachhi-wooden-stacker.webp',
      seller: 'GUBBACHHI Crafts',
      verified: true,
      location: 'Mumbai, Maharashtra'
    },
    {
      id: 35,
      name: 'Channapatna Toys Wooden Train with Tiger Doll',
      price: '₹649',
      image: '/images/products/channapatna-wooden-train.jpg',
      seller: 'Channapatna Toys Co',
      verified: true,
      location: 'Channapatna, Karnataka'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-terracotta to-leaf-green text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              {t('heroSubtitle')}
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-text-gray rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="bg-white text-terracotta px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-gray-100 transition-colors font-medium text-sm sm:text-base"
                >
                  {t('search')}
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
              <Link
                to="/products"
                className="bg-white text-terracotta px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-center text-sm sm:text-base"
              >
                {t('exploreProducts')}
              </Link>
              <Link
                to="/signup"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-terracotta transition-colors text-center text-sm sm:text-base"
              >
                {t('joinAsSeller')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Toys Video Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Video Section */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src="/images/toys.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-gray leading-tight">
                  {t('whyToysSpecial')}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {t('toysDescription')}
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-terracotta rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <span className="text-white text-xs sm:text-sm">🎨</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-gray mb-1 sm:mb-2 text-base sm:text-lg">{t('handPaintedArtistry')}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('handPaintedDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-leaf-green rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <span className="text-white text-xs sm:text-sm">🌿</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-gray mb-1 sm:mb-2 text-base sm:text-lg">{t('ecoFriendlyMaterials')}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('ecoFriendlyDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-terracotta rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <span className="text-white text-xs sm:text-sm">🏛️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-gray mb-1 sm:mb-2 text-base sm:text-lg">{t('culturalHeritage')}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('culturalHeritageDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-leaf-green rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <span className="text-white text-xs sm:text-sm">🧠</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-gray mb-1 sm:mb-2 text-base sm:text-lg">{t('educationalValue')}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('educationalValueDesc')}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 sm:pt-6">
                <Link
                  to="/products?category=handicrafts"
                  className="inline-flex items-center justify-center w-full sm:w-auto bg-terracotta text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t('exploreToyCollection')}
                  <svg className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skilled Workers Video Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Content Section */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-gray leading-tight">
                  {t('skilledCraftsmen')}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {t('craftsmenDescription')}
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-terracotta rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <span className="text-white text-xs sm:text-sm">👨‍🎨</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-gray mb-1 sm:mb-2 text-base sm:text-lg">{t('generationalExpertise')}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('generationalExpertiseDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-leaf-green rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <span className="text-white text-xs sm:text-sm">🏆</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-gray mb-1 sm:mb-2 text-base sm:text-lg">{t('awardWinningCraftsmanship')}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('awardWinningDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-terracotta rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <span className="text-white text-xs sm:text-sm">🎯</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-gray mb-1 sm:mb-2 text-base sm:text-lg">{t('specializedTechniques')}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('specializedTechniquesDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-leaf-green rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <span className="text-white text-xs sm:text-sm">🌟</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-gray mb-1 sm:mb-2 text-base sm:text-lg">{t('continuousInnovation')}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('continuousInnovationDesc')}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-leaf-green bg-opacity-10 p-4 sm:p-6 lg:p-8 rounded-xl border border-leaf-green border-opacity-20">
                <h4 className="font-semibold text-text-gray mb-3 sm:mb-4 text-base sm:text-lg">{t('expertFields')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-leaf-green rounded-full flex-shrink-0"></span>
                    <span>{t('woodCarving')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-leaf-green rounded-full flex-shrink-0"></span>
                    <span>{t('lacquerWork')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-leaf-green rounded-full flex-shrink-0"></span>
                    <span>{t('naturalPainting')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-leaf-green rounded-full flex-shrink-0"></span>
                    <span>{t('toyDesign')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-leaf-green rounded-full flex-shrink-0"></span>
                    <span>{t('qualityControl')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-leaf-green rounded-full flex-shrink-0"></span>
                    <span>{t('finishingTechniques')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Section */}
            <div>
              <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src="/images/worker.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed px-2">
                  Watch our master craftsmen at work, creating beautiful toys with precision and passion
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sawantwadi Spotlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-gray mb-4">
              Spotlight: Sawantwadi Wooden Toys
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the vibrant world of hand-painted wooden toys from Sawantwadi, 
              a 200-year-old craft tradition from Sindhudurg district
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/sawantwadi-toys-banner.svg"
                alt="Sawantwadi Wooden Toys"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-text-gray">
                Heritage Craftsmanship
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Each toy is meticulously hand-carved from sustainable wood and painted with 
                natural colors. These toys represent the rich cultural heritage of Maharashtra 
                and support local artisan families.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-leaf-green mr-3">✓</span>
                  <span>100% Natural Materials</span>
                </div>
                <div className="flex items-center">
                  <span className="text-leaf-green mr-3">✓</span>
                  <span>Hand-painted by Local Artisans</span>
                </div>
                <div className="flex items-center">
                  <span className="text-leaf-green mr-3">✓</span>
                  <span>Safe for Children</span>
                </div>
                <div className="flex items-center">
                  <span className="text-leaf-green mr-3">✓</span>
                  <span>Supporting Rural Livelihoods</span>
                </div>
              </div>
              <Link
                to="/products?category=handicrafts"
                className="inline-block bg-terracotta text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Shop Sawantwadi Toys
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-gray mb-4">
              Explore Categories
            </h2>
            <p className="text-lg text-gray-600">
              Discover authentic products from Maharashtra's rural entrepreneurs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-text-gray mb-2 group-hover:text-terracotta transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <p className="text-xs text-terracotta font-medium">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-gray mb-4">
              Made in Maharashtra
            </h2>
            <p className="text-lg text-gray-600">
              Featured products from verified rural entrepreneurs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-w-16 aspect-h-10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-text-gray group-hover:text-terracotta transition-colors">
                      {product.name}
                    </h3>
                    {product.verified && (
                      <span className="ml-2 bg-leaf-green text-white text-xs px-2 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-terracotta mb-2">{product.price}</p>
                  <p className="text-sm text-gray-600 mb-1">{product.seller}</p>
                  <p className="text-xs text-gray-500">{product.location}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-terracotta text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-leaf-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the RuralReach Community
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're an entrepreneur looking to showcase your products or a buyer 
            seeking authentic Maharashtra crafts, we're here to connect you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup?role=entrepreneur"
              className="bg-white text-leaf-green px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Selling
            </Link>
            <Link
              to="/signup?role=buyer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-leaf-green transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
