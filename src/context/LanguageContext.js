import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language translations
const translations = {
  marathi: {
    // Navigation
    home: 'मुख्यपृष्ठ',
    products: 'उत्पादने',
    login: 'लॉगिन',
    signup: 'नोंदणी',
    logout: 'लॉगआउट',
    profile: 'प्रोफाइल',
    cart: 'कार्ट',
    
    // Home Page
    heroTitle: 'रुरलरीच महाराष्ट्र',
    heroSubtitle: 'ग्रामीण उद्योजकांना सशक्त करणे आणि अस्सल महाराष्ट्रीय हस्तकला जगाशी जोडणे',
    searchPlaceholder: 'सावंतवाडी खेळणी, सेंद्रिय उत्पादने, हस्तकला शोधा...',
    search: 'शोधा',
    exploreProducts: 'उत्पादने पहा',
    joinAsSeller: 'विक्रेता म्हणून सामील व्हा',
    
    // Special Toys Section
    whyToysSpecial: 'ही खेळणी का खास आहेत?',
    toysDescription: 'आमच्या हस्तनिर्मित लाकडी खेळण्यांची अपवादात्मक गुणवत्ता शोधा',
    handPaintedArtistry: 'हस्तचित्रित कलाकुसर',
    handPaintedDesc: 'प्रत्येक खेळणी वैयक्तिकरित्या हस्तचित्रित केली जाते, नैसर्गिक, विषारी नसलेल्या रंगांचा वापर करून कुशल कारागिरांकडून जे पिढ्यानपिढ्या हे कौशल्य वारसाहक्काने मिळवले आहे.',
    ecoFriendlyMaterials: 'पर्यावरणपूरक साहित्य',
    ecoFriendlyDesc: 'शाश्वत स्रोतातून मिळवलेल्या लाकडापासून बनवलेले आणि नैसर्गिक लाखाने पूर्ण केलेले, ही खेळणी मुलांसाठी पूर्णपणे सुरक्षित आणि पर्यावरणपूरक आहेत.',
    culturalHeritage: 'सांस्कृतिक वारसा',
    culturalHeritageDesc: 'ही खेळणी 200+ वर्षांची सावंतवाडी परंपरा वाहून नेतात, महाराष्ट्राच्या समृद्ध सांस्कृतिक वारशाचे प्रतिनिधित्व करतात आणि स्थानिक कारागीर समुदायांना आधार देतात.',
    educationalValue: 'शैक्षणिक मूल्य',
    educationalValueDesc: 'सर्जनशीलता, मोटर कौशल्ये आणि संज्ञानात्मक विकास वाढवण्यासाठी डिझाइन केलेली, मुलांसाठी तासनतास स्क्रीन-मुक्त मनोरंजन प्रदान करतात.',
    exploreToyCollection: 'आमचा खेळणी संग्रह पहा',
    
    // Skilled Workers Section
    skilledCraftsmen: 'आमचे कुशल कारागीर',
    craftsmenDescription: 'प्रत्येक निर्मितीमागील मास्टर कारागीरांना भेटा - तज्ञ ज्यांनी त्यांचे जीवन पारंपरिक कलांचे जतन आणि परिपूर्णता यासाठी समर्पित केले आहे.',
    generationalExpertise: 'पिढ्यानपिढ्यांचे कौशल्य',
    generationalExpertiseDesc: 'आमच्या कारागिरांनी त्यांचे कौशल्य पिढ्यानपिढ्या वारसाहक्काने मिळवले आहे, अनेक कुटुंबे 100 वर्षांहून अधिक काळ समान कला करत आहेत.',
    awardWinningCraftsmanship: 'पुरस्कार विजेते कारागिरी',
    awardWinningDesc: 'आमच्या अनेक कारागिरांना त्यांच्या अपवादात्मक कौशल्यांसाठी आणि पारंपरिक कलांचे जतन करण्याच्या योगदानासाठी राज्य आणि राष्ट्रीय मान्यता मिळाली आहे.',
    specializedTechniques: 'विशेष तंत्रे',
    specializedTechniquesDesc: 'प्रत्येक कारागीर विशिष्ट तंत्रांमध्ये तज्ञ आहे - जटिल लाकूड कोरीवकामापासून अचूक लाख लावण्यापर्यंत, सर्वोच्च गुणवत्तेचे मानक सुनिश्चित करतात.',
    continuousInnovation: 'सतत नवाचार',
    continuousInnovationDesc: 'पारंपरिक पद्धती जपत असताना, आमचे कारागीर सतत नवाचार करतात, आधुनिक ग्राहकांना आकर्षित करणारी समकालीन डिझाइन तयार करतात.',
    expertFields: 'तज्ञ क्षेत्रे समाविष्ट:',
    woodCarving: 'लाकूड कोरीवकाम',
    lacquerWork: 'लाख काम',
    naturalPainting: 'नैसर्गिक चित्रकारी',
    toyDesign: 'खेळणी डिझाइन',
    qualityControl: 'गुणवत्ता नियंत्रण',
    finishingTechniques: 'फिनिशिंग तंत्रे',
    
    // Categories
    handicrafts: 'हस्तकला',
    handicraftsDesc: 'पारंपरिक हस्तनिर्मित कलाकृती',
    agroProducts: 'कृषी उत्पादने',
    agroProductsDesc: 'ताजी शेतमाल',
    textiles: 'वस्त्र',
    textilesDesc: 'हस्तविणीत कापड',
    localFoods: 'स्थानिक खाद्यपदार्थ',
    localFoodsDesc: 'पारंपरिक स्वादिष्ट पदार्थ',
    services: 'सेवा',
    servicesDesc: 'स्थानिक सेवा',
    
    // Profile
    profileInformation: 'प्रोफाइल माहिती',
    editProfile: 'प्रोफाइल संपादित करा',
    cancel: 'रद्द करा',
    saveChanges: 'बदल जतन करा',
    saving: 'जतन करत आहे...',
    profileUpdated: 'प्रोफाइल यशस्वीरित्या अपडेट झाले!',
    personalInformation: 'वैयक्तिक माहिती',
    addressInformation: 'पत्ता माहिती',
    fullName: 'पूर्ण नाव',
    email: 'ईमेल',
    phone: 'फोन',
    city: 'शहर',
    state: 'राज्य',
    pincode: 'पिनकोड',
    address: 'पत्ता',
    role: 'भूमिका',
    orderHistory: 'ऑर्डर इतिहास',
    notifications: 'सूचना',
    activities: 'क्रियाकलाप',
    recentActivity: 'अलीकडील क्रियाकलाप',
    
    // Form Validation
    nameRequired: 'पूर्ण नाव आवश्यक आहे',
    nameMinLength: 'नाव किमान 2 अक्षरांचे असावे',
    emailRequired: 'ईमेल आवश्यक आहे',
    validEmail: 'कृपया वैध ईमेल पत्ता प्रविष्ट करा',
    validPhone: 'कृपया वैध फोन नंबर प्रविष्ट करा',
    validPincode: 'पिनकोड 6 अंकांचा असावा',
    
    // Common
    notProvided: 'प्रदान केले नाही',
    verified: 'सत्यापित',
    pending: 'प्रलंबित',
    active: 'सक्रिय',
    buyer: 'खरेदीदार',
    entrepreneur: 'उद्योजक',
    admin: 'प्रशासक',
    
    // Language
    language: 'भाषा',
    changeLanguage: 'भाषा बदला',
    
    // Mobile specific
    menu: 'मेनू',
    close: 'बंद करा',
    viewDetails: 'तपशील पहा',
    addToCart: 'कार्टमध्ये जोडा',
    quantity: 'प्रमाण',
    price: 'किंमत',
    total: 'एकूण',
    
    // Admin Panel
    adminPanel: 'प्रशासक पॅनेल',
    dashboard: 'डॅशबोर्ड',
    users: 'वापरकर्ते',
    orders: 'ऑर्डर',
    entrepreneurs: 'उद्योजक',
    buyers: 'खरेदीदार',
    approve: 'मंजूर करा',
    reject: 'नाकारा',
    processOrder: 'ऑर्डर प्रक्रिया करा'
  },
  
  english: {
    // Navigation
    home: 'Home',
    products: 'Products',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    profile: 'Profile',
    cart: 'Cart',
    
    // Home Page
    heroTitle: 'RuralReach Maharashtra',
    heroSubtitle: 'Empowering rural entrepreneurs and connecting authentic Maharashtra crafts with the world',
    searchPlaceholder: 'Search for Sawantwadi toys, organic products, handicrafts...',
    search: 'Search',
    exploreProducts: 'Explore Products',
    joinAsSeller: 'Join as Seller',
    
    // Special Toys Section
    whyToysSpecial: 'Why Are These Toys Special?',
    toysDescription: 'Discover what makes our handcrafted wooden toys truly exceptional',
    handPaintedArtistry: 'Hand-Painted Artistry',
    handPaintedDesc: 'Each toy is individually hand-painted using natural, non-toxic colors by skilled artisans who have inherited this craft through generations.',
    ecoFriendlyMaterials: 'Eco-Friendly Materials',
    ecoFriendlyDesc: 'Made from sustainably sourced wood and finished with natural lacquers, these toys are completely safe for children and environmentally friendly.',
    culturalHeritage: 'Cultural Heritage',
    culturalHeritageDesc: 'These toys carry 200+ years of Sawantwadi tradition, representing Maharashtra\'s rich cultural heritage and supporting local artisan communities.',
    educationalValue: 'Educational Value',
    educationalValueDesc: 'Designed to enhance creativity, motor skills, and cognitive development while providing hours of screen-free entertainment for children.',
    exploreToyCollection: 'Explore Our Toy Collection',
    
    // Skilled Workers Section
    skilledCraftsmen: 'Our Skilled Craftsmen',
    craftsmenDescription: 'Meet the master artisans behind every creation - experts who have dedicated their lives to preserving and perfecting traditional crafts.',
    generationalExpertise: 'Generational Expertise',
    generationalExpertiseDesc: 'Our artisans have inherited their skills through generations, with many families practicing the same craft for over 100 years.',
    awardWinningCraftsmanship: 'Award-Winning Craftsmanship',
    awardWinningDesc: 'Many of our artisans have received state and national recognition for their exceptional skills and contribution to preserving traditional arts.',
    specializedTechniques: 'Specialized Techniques',
    specializedTechniquesDesc: 'Each craftsman specializes in specific techniques - from intricate wood carving to precise lacquer application, ensuring the highest quality standards.',
    continuousInnovation: 'Continuous Innovation',
    continuousInnovationDesc: 'While preserving traditional methods, our artisans continuously innovate, creating contemporary designs that appeal to modern customers worldwide.',
    expertFields: 'Expert Fields Include:',
    woodCarving: 'Wood Carving',
    lacquerWork: 'Lacquer Work',
    naturalPainting: 'Natural Painting',
    toyDesign: 'Toy Design',
    qualityControl: 'Quality Control',
    finishingTechniques: 'Finishing Techniques',
    
    // Categories
    handicrafts: 'Handicrafts',
    handicraftsDesc: 'Traditional handmade crafts',
    agroProducts: 'Agro Products',
    agroProductsDesc: 'Fresh farm produce',
    textiles: 'Textiles',
    textilesDesc: 'Handwoven fabrics',
    localFoods: 'Local Foods',
    localFoodsDesc: 'Traditional delicacies',
    services: 'Services',
    servicesDesc: 'Local services',
    
    // Profile
    profileInformation: 'Profile Information',
    editProfile: 'Edit Profile',
    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    saving: 'Saving...',
    profileUpdated: 'Profile updated successfully!',
    personalInformation: 'Personal Information',
    addressInformation: 'Address Information',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    city: 'City',
    state: 'State',
    pincode: 'Pincode',
    address: 'Address',
    role: 'Role',
    orderHistory: 'Order History',
    notifications: 'Notifications',
    activities: 'Activities',
    recentActivity: 'Recent Activity',
    
    // Form Validation
    nameRequired: 'Full name is required',
    nameMinLength: 'Name must be at least 2 characters long',
    emailRequired: 'Email is required',
    validEmail: 'Please enter a valid email address',
    validPhone: 'Please enter a valid phone number',
    validPincode: 'Pincode must be 6 digits',
    
    // Common
    notProvided: 'Not provided',
    verified: 'Verified',
    pending: 'Pending',
    active: 'Active',
    buyer: 'Buyer',
    entrepreneur: 'Entrepreneur',
    admin: 'Admin',
    
    // Language
    language: 'Language',
    changeLanguage: 'Change Language',
    
    // Mobile specific
    menu: 'Menu',
    close: 'Close',
    viewDetails: 'View Details',
    addToCart: 'Add to Cart',
    quantity: 'Quantity',
    price: 'Price',
    total: 'Total',
    
    // Admin Panel
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    users: 'Users',
    orders: 'Orders',
    entrepreneurs: 'Entrepreneurs',
    buyers: 'Buyers',
    approve: 'Approve',
    reject: 'Reject',
    processOrder: 'Process Order'
  },
  
  hindi: {
    // Navigation
    home: 'होम',
    products: 'उत्पाद',
    login: 'लॉगिन',
    signup: 'साइन अप',
    logout: 'लॉगआउट',
    profile: 'प्रोफाइल',
    cart: 'कार्ट',
    
    // Home Page
    heroTitle: 'रुरलरीच महाराष्ट्र',
    heroSubtitle: 'ग्रामीण उद्यमियों को सशक्त बनाना और प्रामाणिक महाराष्ट्र शिल्प को दुनिया से जोड़ना',
    searchPlaceholder: 'सावंतवाड़ी खिलौने, जैविक उत्पाद, हस्तशिल्प खोजें...',
    search: 'खोजें',
    exploreProducts: 'उत्पाद देखें',
    joinAsSeller: 'विक्रेता के रूप में जुड़ें',
    
    // Add more Hindi translations as needed...
    language: 'भाषा',
    changeLanguage: 'भाषा बदलें'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('marathi'); // Default to Marathi
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    setLoading(false);
  }, []);

  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
      localStorage.setItem('selectedLanguage', language);
    }
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.english[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'marathi', name: 'मराठी', nativeName: 'मराठी' },
      { code: 'english', name: 'English', nativeName: 'English' },
      { code: 'hindi', name: 'हिंदी', nativeName: 'हिंदी' }
    ],
    loading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
