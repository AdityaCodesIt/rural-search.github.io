// Comprehensive product reviews data
export const generateProductReviews = (productId) => {
  const reviewTemplates = [
    // 5-star reviews (70%)
    { rating: 5, comments: [
      "Excellent quality! My kids absolutely love these toys. Highly recommended!",
      "Beautiful craftsmanship and vibrant colors. Worth every penny!",
      "Amazing traditional toys. Great for supporting local artisans.",
      "Perfect gift for children. Safe, durable and educational.",
      "Outstanding quality and fast delivery. Will definitely buy again!",
      "Authentic handmade toys with beautiful finishing. Love it!",
      "My daughter plays with these every day. Great investment!",
      "Superb quality wooden toys. Exactly as described.",
      "Fantastic product! The attention to detail is remarkable.",
      "Best wooden toys I've purchased. Highly satisfied!",
      "Excellent craftsmanship. These toys are built to last.",
      "Amazing quality and beautiful design. Kids love them!",
      "Perfect educational toys. Great for motor skill development.",
      "Wonderful traditional toys. Brings back childhood memories!",
      "Top-notch quality and eco-friendly. Couldn't be happier!",
      "Brilliant toys! My son is obsessed with them.",
      "Exceptional quality and beautiful colors. Highly recommend!",
      "Great value for money. These toys are fantastic!",
      "Love supporting local artisans. Quality is outstanding!",
      "Perfect size and weight for toddlers. Excellent buy!",
      "Amazing attention to detail. These are works of art!",
      "Durable and safe for children. Very impressed!",
      "Beautiful traditional designs. Kids learn while playing!",
      "Excellent packaging and fast shipping. Great service!",
      "These toys spark creativity and imagination. Love them!",
      "High-quality materials and non-toxic paint. Perfect!",
      "Wonderful addition to our toy collection. Highly recommended!",
      "Great educational value and entertainment. Five stars!",
      "Beautifully crafted toys that will last for years!",
      "Perfect for developing fine motor skills. Excellent quality!",
      "Amazing traditional craftsmanship. Kids are fascinated!",
      "Excellent customer service and product quality. Satisfied!",
      "These toys are both fun and educational. Perfect combination!",
      "Great quality wooden toys at reasonable price. Recommended!",
      "Beautiful colors and smooth finish. Kids love playing with them!",
      "Authentic Sawantwadi toys. Supporting local culture!",
      "Excellent build quality and attention to detail. Impressed!",
      "Perfect toys for imaginative play. Kids create stories!",
      "Great investment in quality toys. Will last generations!",
      "Amazing craftsmanship and cultural significance. Love it!",
      "Perfect gift for any occasion. Kids absolutely adore them!",
      "Excellent quality control and finishing. Very professional!",
      "These toys encourage creative thinking. Highly educational!",
      "Beautiful traditional art on functional toys. Fantastic!",
      "Great for hand-eye coordination development. Recommended!",
      "Wonderful customer experience from order to delivery!",
      "These toys are heirloom quality. Passing to next generation!",
      "Perfect balance of fun and learning. Kids engaged for hours!",
      "Amazing quality wooden toys. Exceeded expectations completely!",
      "Great for developing problem-solving skills. Educational and fun!"
    ]},
    // 4-star reviews (20%)
    { rating: 4, comments: [
      "Good quality toys but slightly expensive. Kids enjoy them though.",
      "Nice craftsmanship. Delivery took a bit longer than expected.",
      "Great toys overall. Could use better packaging for shipping.",
      "Good quality but smaller than I expected. Still satisfied.",
      "Nice traditional toys. Price is a bit high but quality justifies it.",
      "Good educational value. Wish there were more pieces in the set.",
      "Quality is good but colors could be more vibrant.",
      "Nice toys for kids. Delivery was delayed but worth the wait.",
      "Good craftsmanship. Would like to see more variety in designs.",
      "Decent quality toys. Kids like them but not their absolute favorite.",
      "Good value for money. Minor scratches on one piece.",
      "Nice traditional toys. Packaging could be more eco-friendly.",
      "Good quality but took time to arrive. Kids love them now.",
      "Decent toys for the price. Could use better instructions.",
      "Good educational toys. Wish they came with activity guide.",
      "Nice craftsmanship but one piece had a small defect.",
      "Good toys overall. Customer service could be more responsive.",
      "Decent quality. Kids enjoy but expected more pieces.",
      "Good traditional toys. Price is reasonable for handmade items.",
      "Nice toys but delivery packaging was not very secure."
    ]},
    // 3-star reviews (7%)
    { rating: 3, comments: [
      "Average quality. Kids play with them occasionally.",
      "Okay toys but not as impressive as expected from reviews.",
      "Decent quality but overpriced for what you get.",
      "Average craftsmanship. Some rough edges need smoothing.",
      "Okay toys. Kids lost interest after a few days.",
      "Decent but expected better quality for the price point.",
      "Average toys. Nothing special but kids use them sometimes.",
      "Okay quality but delivery was very slow.",
      "Decent toys but colors started fading after few months.",
      "Average product. Expected more based on description."
    ]},
    // 2-star reviews (2%)
    { rating: 2, comments: [
      "Poor quality for the price. Paint chipped within days.",
      "Not impressed. Toys broke easily with normal play.",
      "Overpriced for the quality received. Disappointed.",
      "Poor packaging led to damaged toys. Not happy.",
      "Quality doesn't match the price. Expected much better."
    ]},
    // 1-star reviews (1%)
    { rating: 1, comments: [
      "Terrible quality. Toys broke on first day. Waste of money.",
      "Very poor craftsmanship. Paint toxic smell. Returning immediately.",
      "Worst purchase ever. Nothing like the pictures shown."
    ]}
  ];

  const names = [
    "Priya Sharma", "Rajesh Kumar", "Anita Desai", "Vikram Singh", "Meera Patel",
    "Arjun Reddy", "Kavya Nair", "Rohit Gupta", "Sneha Joshi", "Amit Verma",
    "Pooja Agarwal", "Karan Malhotra", "Ritu Bansal", "Sanjay Yadav", "Neha Kapoor",
    "Deepak Sharma", "Sunita Rao", "Manish Tiwari", "Shweta Kulkarni", "Rahul Mehta",
    "Anjali Singh", "Varun Chopra", "Preeti Saxena", "Nikhil Jain", "Swati Mishra",
    "Gaurav Pandey", "Rekha Sinha", "Ashish Kumar", "Divya Bhatt", "Suresh Iyer",
    "Madhuri Devi", "Ravi Prasad", "Nisha Agrawal", "Vivek Dubey", "Seema Gupta",
    "Harish Chandra", "Lata Mangeshkar", "Sunil Gavaskar", "Asha Parekh", "Dev Anand",
    "Kishore Kumar", "Laxmi Narayan", "Bharat Ratna", "Saraswati Devi", "Ganesh Rao",
    "Lakshmi Bai", "Chandragupta", "Ashoka Maurya", "Akbar Shah", "Birbal Das",
    "Tansen Kumar", "Mirabai Devi", "Tulsidas Ji", "Kabir Das", "Rahim Khan",
    "Surdas Ji", "Bharatendu", "Premchand", "Mahadevi", "Sumitranandan",
    "Harivansh Rai", "Ramdhari Singh", "Nagarjun", "Kedarnath Singh", "Kunwar Narayan",
    "Nirala Ji", "Pant Ji", "Prasad Ji", "Dinkar Ji", "Bachchan Ji",
    "Shivani Devi", "Krishna Sobti", "Ismat Chughtai", "Qurratulain", "Amrita Pritam",
    "Mahasweta Devi", "Shashi Deshpande", "Anita Desai", "Kiran Desai", "Arundhati Roy",
    "Chetan Bhagat", "Amish Tripathi", "Ashwin Sanghi", "Devdutt Pattanaik", "Ruskin Bond",
    "R.K. Narayan", "Mulk Raj Anand", "Khushwant Singh", "Vikram Seth", "Salman Rushdie",
    "Aravind Adiga", "Kiran Nagarkar", "Shobhaa De", "Jhumpa Lahiri", "Bharati Mukherjee",
    "Anita Nair", "Kavery Nambisan", "Githa Hariharan", "Namita Gokhale", "Manju Kapur",
    "Shobha Rao", "Madhuri Vijay", "Deepti Kapoor", "Anuradha Roy", "Neel Mukherjee",
    "Siddharth Dhanvant", "Pankaj Mishra", "William Dalrymple", "Ramachandra Guha", "Sunil Khilnani",
    "Gurcharan Das", "Shashi Tharoor", "Amartya Sen", "Jagdish Bhagwati", "Raghuram Rajan",
    "Urjit Patel", "Manmohan Singh", "P. Chidambaram", "Arun Jaitley", "Nirmala Sitharaman",
    "Smriti Irani", "Sushma Swaraj", "Vasundhara Raje", "Mamata Banerjee", "Mayawati Devi",
    "Uma Bharti", "Sadhvi Pragya", "Hema Malini", "Jaya Prada", "Kirron Kher"
  ];

  const getRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      .toISOString().split('T')[0];
  };

  const reviews = [];
  let reviewId = 1;

  // Generate reviews based on rating distribution
  reviewTemplates.forEach(template => {
    const count = template.rating === 5 ? 105 : 
                  template.rating === 4 ? 30 : 
                  template.rating === 3 ? 10 : 
                  template.rating === 2 ? 3 : 2;
    
    for (let i = 0; i < count; i++) {
      reviews.push({
        id: reviewId++,
        user: names[Math.floor(Math.random() * names.length)],
        rating: template.rating,
        date: getRandomDate(),
        comment: template.comments[Math.floor(Math.random() * template.comments.length)],
        verified: Math.random() > 0.1, // 90% verified purchases
        helpful: Math.floor(Math.random() * 20)
      });
    }
  });

  // Sort by date (newest first)
  return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
};
