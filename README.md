# RuralReach - Empowering Maharashtra's Rural Entrepreneurs

A modern React-based marketplace connecting rural entrepreneurs from Maharashtra with buyers, featuring authentic products like Sawantwadi Wooden Toys, organic produce, handloom textiles, and traditional crafts.

## 🎯 Features

### Authentication & User Management
- **Role-based Registration**: Separate flows for Entrepreneurs and Buyers
- **Google Authentication**: Quick sign-up with Google
- **Password Recovery**: Forgot password functionality
- **Profile Management**: Complete user profile settings

### Home & Discovery
- **Hero Section**: Highlighting Sawantwadi Wooden Toys
- **Product Search**: Advanced search with filters
- **Categories**: Handicrafts, Agro Products, Textiles, Local Foods, Services
- **Featured Products**: "Made in Maharashtra" spotlight section
- **Responsive Design**: Mobile-first approach

### Product Management
- **Product Listings**: Grid layout with filters and sorting
- **Product Details**: Comprehensive product information
- **Seller Information**: Verified seller badges and profiles
- **Reviews & Ratings**: Customer feedback system
- **Stock Management**: Real-time inventory tracking

### Dashboards

#### Entrepreneur Dashboard
- **Product Management**: Add, edit, delete products
- **Order Management**: View and process orders
- **Analytics**: Product views, sales, and revenue tracking
- **Verification Status**: KYC and brand verification
- **Inventory Control**: Stock management

#### Buyer Dashboard
- **Order History**: Track past purchases
- **Wishlist**: Save favorite products
- **Reviews**: Write and manage product reviews
- **Profile Settings**: Update personal information
- **Order Tracking**: Real-time delivery updates

#### Admin Dashboard
- **User Management**: Approve entrepreneur applications
- **Product Approval**: Review and approve product listings
- **Analytics**: Platform statistics and reports
- **Activity Monitoring**: Recent platform activity
- **Regional Insights**: District-wise seller distribution

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.2
- **Routing**: React Router DOM 6.14.1
- **Authentication**: Firebase Auth 9.23.0
- **Database**: Firebase Firestore
- **HTTP Client**: Axios 1.4.0
- **Build Tool**: Create React App

## 🎨 Design System

### Color Palette
- **Primary (Terracotta)**: #C96B3B
- **Accent (Leaf Green)**: #2D6A4F
- **Background (Cream)**: #FDF6EC
- **Text (Gray)**: #333333

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Soft shadows, rounded corners
- **Buttons**: Consistent hover states
- **Forms**: Clean input styling with focus states
- **Navigation**: Sticky header with mobile responsiveness

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account (for authentication and database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ruralreach-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Copy your Firebase config to `src/firebase.js`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px and above

## 🔐 Authentication Flow

1. **User Registration**: Choose role (Entrepreneur/Buyer)
2. **Email Verification**: Verify email address
3. **Profile Setup**: Complete profile information
4. **Dashboard Access**: Role-based dashboard redirection

### Entrepreneur Verification Process
1. **Application Submission**: Business details and documents
2. **Admin Review**: Manual verification by admin
3. **KYC Verification**: Document verification
4. **Brand Verification**: "Rural Brand Verified" badge

## 📦 Featured Products

### Sawantwadi Wooden Toys
- **Origin**: Sawantwadi, Sindhudurg District
- **Heritage**: 200-year-old craft tradition
- **Features**: Hand-painted, natural materials, cultural significance
- **Safety**: Non-toxic colors, child-safe

### Product Categories
- **Handicrafts**: Traditional crafts and artwork
- **Agro Products**: Organic produce and farm goods
- **Textiles**: Handloom and traditional fabrics
- **Local Foods**: Traditional delicacies and preserves
- **Services**: Local services and consultancy

## 🌟 Key Features

### For Entrepreneurs
- **Easy Product Listing**: Simple product upload process
- **Order Management**: Streamlined order processing
- **Analytics Dashboard**: Sales and performance insights
- **Verification System**: Build trust with verified badges
- **Mobile-Friendly**: Manage business on the go

### For Buyers
- **Authentic Products**: Verified rural entrepreneurs
- **Secure Shopping**: Safe payment and delivery
- **Product Discovery**: Advanced search and filters
- **Review System**: Share experiences and feedback
- **Wishlist**: Save products for later

### For Admins
- **Platform Management**: Complete admin control
- **Quality Assurance**: Product and seller verification
- **Analytics**: Comprehensive platform insights
- **User Support**: Manage user queries and issues

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable components
│   └── Navbar.js       # Navigation component
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── Login.js        # Authentication
│   ├── Signup.js       # User registration
│   ├── ProductListings.js  # Product catalog
│   ├── ProductDetails.js   # Product details
│   ├── EntrepreneurDashboard.js  # Seller dashboard
│   ├── BuyerDashboard.js        # Buyer dashboard
│   └── AdminDashboard.js        # Admin panel
├── firebase.js         # Firebase configuration
├── App.js             # Main app component
├── index.js           # App entry point
└── index.css          # Global styles
```

### Available Scripts
- `npm start`: Development server
- `npm build`: Production build
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Sawantwadi Artisans**: For preserving traditional wooden toy craftsmanship
- **Maharashtra Government**: For supporting rural entrepreneurship
- **Local Communities**: For their authentic products and cultural heritage
- **Firebase**: For backend services
- **Tailwind CSS**: For styling framework
- **React Community**: For the amazing ecosystem

## 📞 Support

For support and queries:
- **Email**: support@ruralreach.com
- **Phone**: +91 98765 43210
- **Address**: Mumbai, Maharashtra, India

---

**RuralReach** - Connecting Maharashtra's rural heritage with the world 🌾✨
