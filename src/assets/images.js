// Image assets for RuralReach application
export const images = {
  // Hero and banners
  heroBanner: '/images/sawantwadi-toys-banner.jpg',
  sawantwadiShowcase: '/images/sawantwadi-showcase.jpg',
  
  // Product images
  sawantwadiToys: '/images/products/sawantwadi-wooden-toys.jpg',
  elephantSet: '/images/products/wooden-elephant-set.jpg',
  alphonsoMangoes: '/images/products/alphonso-mangoes.jpg',
  paithaniSaree: '/images/products/paithani-saree.jpg',
  sahyadriHoney: '/images/products/sahyadri-honey.jpg',
  warliArt: '/images/products/warli-art-toys.jpg',
  bambooBask: '/images/products/bamboo-baskets.jpg',
  turmericPowder: '/images/products/turmeric-powder.jpg',
  cottonSaree: '/images/products/cotton-saree.jpg',
  
  // Seller logos
  artisanCrafts: '/images/sellers/artisan-crafts-logo.jpg',
  konkanFarms: '/images/sellers/konkan-farms-logo.jpg',
  traditionalWeavers: '/images/sellers/traditional-weavers-logo.jpg',
  mountainBee: '/images/sellers/mountain-bee-logo.jpg',
  tribalArt: '/images/sellers/tribal-art-logo.jpg',
  
  // Placeholders
  placeholder: '/images/placeholder.jpg',
  userAvatar: '/images/user-avatar.jpg'
};

// Fallback function for missing images
export const getImageUrl = (imagePath, fallback = images.placeholder) => {
  return imagePath || fallback;
};
