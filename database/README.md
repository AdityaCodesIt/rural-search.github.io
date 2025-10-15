# RuralReach Database Setup Guide

## 📋 Overview
This directory contains SQL files to set up the complete RuralReach marketplace database for MySQL/MariaDB (XAMPP compatible).

## 📁 Files Included

### 1. `ruralreach_database.sql`
- **Main database structure** with all tables and relationships
- **Indexes** for optimal query performance
- **Foreign key constraints** for data integrity
- **Sample admin user** and basic categories
- **Default Sawantwadi wooden toy product**

### 2. `sample_data.sql`
- **Sample users** (entrepreneurs and buyers)
- **Sample products** with real data from your frontend
- **Sample orders** and order items
- **Product reviews** and ratings
- **Wishlists** and coupons
- **Updated statistics** and analytics data

## 🚀 Installation Instructions

### Step 1: Start XAMPP
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Ensure both services are running (green status)

### Step 2: Access phpMyAdmin
1. Open your web browser
2. Go to: `http://localhost/phpmyadmin`
3. Login with your MySQL credentials (default: no password)

### Step 3: Import Database Structure
1. In phpMyAdmin, click **"Import"** tab
2. Click **"Choose File"** and select `ruralreach_database.sql`
3. Click **"Go"** to execute
4. Wait for success message: "Import has been successfully finished"

### Step 4: Import Sample Data (Optional)
1. Select the `ruralreach` database from the left sidebar
2. Click **"Import"** tab again
3. Choose `sample_data.sql` file
4. Click **"Go"** to execute
5. Verify data has been imported successfully

## 📊 Database Structure

### Core Tables
- **`users`** - User accounts (buyers, entrepreneurs, admins)
- **`products`** - Product catalog with full details
- **`orders`** - Order management and tracking
- **`reviews`** - Product reviews and ratings
- **`categories`** - Product categorization

### Supporting Tables
- **`product_images`** - Product image gallery
- **`order_items`** - Individual items in orders
- **`review_images`** - Review photos
- **`review_helpful`** - Review voting system
- **`wishlists`** - User wishlists
- **`coupons`** - Discount codes

## 🔐 Default Login Credentials

### Admin User
- **Email:** `admin@ruralreach.com`
- **Firebase UID:** `admin_firebase_uid_123`
- **Role:** `admin`

### Sample Entrepreneur
- **Email:** `artisans@sawantwadi.com`
- **Business:** `Sawantwadi Artisans Co-op`
- **Role:** `entrepreneur`

### Sample Buyers
- **Email:** `rajesh@example.com` (Rajesh Kumar)
- **Email:** `anita@example.com` (Anita Desai)
- **Email:** `vikram@example.com` (Vikram Singh)

## 📈 Sample Data Included

### Products (8 items)
1. Handcrafted Sawantwadi Wooden Toys - ₹750
2. Kidology Magnetic Fishing Game - ₹569
3. Nesta Wooden Toaster Set - ₹1,186
4. CrafToys Spinning Tops - ₹299
5. Trinkets Hammer Ball - ₹299
6. Kidology Busy Board - ₹699
7. NESTA Tool Kit Set - ₹1,649
8. GUBBACHHI Stacker Toy - ₹899

### Orders (3 sample orders)
- Order #RR20241001001 - ₹1,449 (Delivered)
- Order #RR20241002002 - ₹875 (Shipped)
- Order #RR20241003003 - ₹403 (Processing)

### Reviews (6 authentic reviews)
- Mix of 4-star and 5-star ratings
- Verified purchase reviews
- Helpful vote counts

## 🔧 Database Configuration

### Connection Settings for Backend
```javascript
// MySQL Connection (replace MongoDB config)
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Default XAMPP password is empty
  database: 'ruralreach',
  port: 3306
};
```

### Environment Variables (.env)
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ruralreach
DB_PORT=3306

# Connection Pool Settings
DB_CONNECTION_LIMIT=10
DB_QUEUE_LIMIT=0
```

## 📋 Verification Steps

### 1. Check Database Creation
```sql
SHOW DATABASES;
-- Should show 'ruralreach' database
```

### 2. Verify Tables
```sql
USE ruralreach;
SHOW TABLES;
-- Should show 11 tables
```

### 3. Check Sample Data
```sql
SELECT COUNT(*) FROM users;     -- Should return 8 users
SELECT COUNT(*) FROM products;  -- Should return 8 products
SELECT COUNT(*) FROM orders;    -- Should return 3 orders
SELECT COUNT(*) FROM reviews;   -- Should return 6 reviews
```

### 4. Test Relationships
```sql
-- Get products with seller info
SELECT p.title, u.business_name, p.current_price 
FROM products p 
JOIN users u ON p.seller_id = u.id 
WHERE p.status = 'active';
```

## 🔍 Common Issues & Solutions

### Issue 1: Import Fails
**Solution:** 
- Check file encoding (should be UTF-8)
- Increase `max_allowed_packet` in MySQL config
- Import tables one by one if needed

### Issue 2: Foreign Key Errors
**Solution:**
- Ensure parent tables are created first
- Check that referenced IDs exist
- Disable foreign key checks temporarily if needed:
```sql
SET FOREIGN_KEY_CHECKS = 0;
-- Import data
SET FOREIGN_KEY_CHECKS = 1;
```

### Issue 3: Character Encoding Issues
**Solution:**
- Set MySQL charset to `utf8mb4`
- Use `utf8mb4_unicode_ci` collation
- Ensure phpMyAdmin uses UTF-8 encoding

## 📊 Performance Optimization

### Indexes Created
- Primary keys on all tables
- Foreign key indexes for joins
- Search indexes on product titles/descriptions
- Composite indexes for common queries

### Query Optimization Tips
```sql
-- Use indexes for filtering
SELECT * FROM products WHERE category = 'handicrafts' AND status = 'active';

-- Join efficiently
SELECT p.*, u.business_name 
FROM products p 
INNER JOIN users u ON p.seller_id = u.id 
WHERE p.verified = 1;
```

## 🔄 Backup & Maintenance

### Create Backup
```bash
mysqldump -u root -p ruralreach > ruralreach_backup.sql
```

### Restore from Backup
```bash
mysql -u root -p ruralreach < ruralreach_backup.sql
```

## 📞 Support

If you encounter any issues:
1. Check XAMPP error logs
2. Verify MySQL service is running
3. Ensure sufficient disk space
4. Check MySQL error log for specific errors

---

**🎉 Your RuralReach database is now ready for development and testing!**
