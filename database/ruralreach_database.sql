-- RuralReach Marketplace Database
-- MySQL/MariaDB Compatible
-- Created for XAMPP Import

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Create Database
CREATE DATABASE IF NOT EXISTS `ruralreach` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ruralreach`;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firebase_uid` varchar(128) NOT NULL UNIQUE,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `phone` varchar(15) DEFAULT NULL,
  `role` enum('buyer','entrepreneur','admin') NOT NULL DEFAULT 'buyer',
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('active','inactive','suspended','pending') NOT NULL DEFAULT 'pending',
  `avatar` varchar(500) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female','other','prefer-not-to-say') DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `business_name` varchar(200) DEFAULT NULL,
  `business_type` enum('handicrafts','textiles','agro-products','local-foods','other') DEFAULT NULL,
  `gst_number` varchar(15) DEFAULT NULL,
  `years_in_business` int(3) DEFAULT NULL,
  `business_description` text DEFAULT NULL,
  `specialties` json DEFAULT NULL,
  `language` varchar(5) DEFAULT 'en',
  `currency` varchar(5) DEFAULT 'INR',
  `email_notifications` tinyint(1) DEFAULT 1,
  `sms_notifications` tinyint(1) DEFAULT 0,
  `push_notifications` tinyint(1) DEFAULT 1,
  `total_orders` int(11) DEFAULT 0,
  `total_spent` decimal(10,2) DEFAULT 0.00,
  `total_sales` int(11) DEFAULT 0,
  `total_revenue` decimal(12,2) DEFAULT 0.00,
  `rating_average` decimal(3,2) DEFAULT 0.00,
  `rating_count` int(11) DEFAULT 0,
  `last_login` timestamp NULL DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT 0,
  `phone_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_role` (`role`),
  KEY `idx_verified` (`verified`),
  KEY `idx_status` (`status`),
  KEY `idx_city_state` (`city`,`state`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `products`
-- --------------------------------------------------------

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(250) NOT NULL UNIQUE,
  `description` text NOT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `category` enum('handicrafts','textiles','agro-products','local-foods','jewelry','pottery','woodwork','metalwork','other') NOT NULL,
  `subcategory` varchar(100) DEFAULT NULL,
  `current_price` decimal(10,2) NOT NULL,
  `original_price` decimal(10,2) DEFAULT NULL,
  `currency` varchar(5) DEFAULT 'INR',
  `stock` int(11) NOT NULL DEFAULT 0,
  `sku` varchar(50) DEFAULT NULL UNIQUE,
  `low_stock_threshold` int(11) DEFAULT 5,
  `track_inventory` tinyint(1) DEFAULT 1,
  `location` varchar(200) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('draft','active','inactive','out-of-stock','discontinued') DEFAULT 'draft',
  `tags` json DEFAULT NULL,
  `dimensions_length` decimal(8,2) DEFAULT NULL,
  `dimensions_width` decimal(8,2) DEFAULT NULL,
  `dimensions_height` decimal(8,2) DEFAULT NULL,
  `dimensions_unit` varchar(10) DEFAULT 'cm',
  `weight_value` decimal(8,2) DEFAULT NULL,
  `weight_unit` varchar(10) DEFAULT 'g',
  `material` varchar(200) DEFAULT NULL,
  `colors` json DEFAULT NULL,
  `age_group` enum('0-2','3-5','6-12','13-18','18+','all-ages') DEFAULT NULL,
  `care_instructions` text DEFAULT NULL,
  `rating_average` decimal(3,2) DEFAULT 0.00,
  `rating_count` int(11) DEFAULT 0,
  `rating_1_star` int(11) DEFAULT 0,
  `rating_2_star` int(11) DEFAULT 0,
  `rating_3_star` int(11) DEFAULT 0,
  `rating_4_star` int(11) DEFAULT 0,
  `rating_5_star` int(11) DEFAULT 0,
  `views` int(11) DEFAULT 0,
  `likes` int(11) DEFAULT 0,
  `shares` int(11) DEFAULT 0,
  `total_sales` int(11) DEFAULT 0,
  `revenue` decimal(12,2) DEFAULT 0.00,
  `free_shipping` tinyint(1) DEFAULT 0,
  `shipping_cost` decimal(8,2) DEFAULT 0.00,
  `processing_time` int(3) DEFAULT 2,
  `meta_title` varchar(60) DEFAULT NULL,
  `meta_description` varchar(160) DEFAULT NULL,
  `keywords` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_seller_id` (`seller_id`),
  KEY `idx_category` (`category`),
  KEY `idx_status` (`status`),
  KEY `idx_verified_featured` (`verified`,`featured`),
  KEY `idx_price` (`current_price`),
  KEY `idx_rating` (`rating_average`),
  KEY `idx_created_at` (`created_at`),
  FULLTEXT KEY `idx_search` (`title`,`description`,`tags`),
  CONSTRAINT `fk_products_seller` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `product_images`
-- --------------------------------------------------------

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `url` varchar(500) NOT NULL,
  `alt_text` varchar(200) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `cloudinary_id` varchar(200) DEFAULT NULL,
  `sort_order` int(3) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_is_primary` (`is_primary`),
  CONSTRAINT `fk_product_images` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `orders`
-- --------------------------------------------------------

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL UNIQUE,
  `buyer_id` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `shipping_cost` decimal(8,2) DEFAULT 0.00,
  `tax_amount` decimal(8,2) DEFAULT 0.00,
  `discount_amount` decimal(8,2) DEFAULT 0.00,
  `discount_code` varchar(50) DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `currency` varchar(5) DEFAULT 'INR',
  `shipping_full_name` varchar(100) NOT NULL,
  `shipping_phone` varchar(15) NOT NULL,
  `shipping_email` varchar(255) NOT NULL,
  `shipping_address` text NOT NULL,
  `shipping_city` varchar(100) NOT NULL,
  `shipping_state` varchar(100) NOT NULL,
  `shipping_pincode` varchar(10) NOT NULL,
  `shipping_landmark` varchar(200) DEFAULT NULL,
  `billing_same_as_shipping` tinyint(1) DEFAULT 1,
  `billing_full_name` varchar(100) DEFAULT NULL,
  `billing_phone` varchar(15) DEFAULT NULL,
  `billing_email` varchar(255) DEFAULT NULL,
  `billing_address` text DEFAULT NULL,
  `billing_city` varchar(100) DEFAULT NULL,
  `billing_state` varchar(100) DEFAULT NULL,
  `billing_pincode` varchar(10) DEFAULT NULL,
  `payment_method` enum('upi','card','netbanking','cod','wallet') NOT NULL,
  `payment_status` enum('pending','processing','completed','failed','refunded','cancelled') DEFAULT 'pending',
  `transaction_id` varchar(100) DEFAULT NULL,
  `payment_gateway` varchar(50) DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','confirmed','processing','shipped','out-for-delivery','delivered','cancelled','returned') DEFAULT 'pending',
  `tracking_number` varchar(100) DEFAULT NULL,
  `carrier` varchar(100) DEFAULT NULL,
  `estimated_delivery` date DEFAULT NULL,
  `actual_delivery` timestamp NULL DEFAULT NULL,
  `buyer_notes` text DEFAULT NULL,
  `seller_notes` text DEFAULT NULL,
  `admin_notes` text DEFAULT NULL,
  `cancelled_reason` text DEFAULT NULL,
  `cancelled_by` int(11) DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `return_requested` tinyint(1) DEFAULT 0,
  `return_reason` text DEFAULT NULL,
  `return_status` enum('requested','approved','rejected','picked-up','completed') DEFAULT NULL,
  `return_requested_at` timestamp NULL DEFAULT NULL,
  `feedback_rating` int(1) DEFAULT NULL,
  `feedback_comment` text DEFAULT NULL,
  `feedback_submitted_at` timestamp NULL DEFAULT NULL,
  `source` enum('web','mobile','api') DEFAULT 'web',
  `user_agent` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_buyer_id` (`buyer_id`),
  KEY `idx_order_number` (`order_number`),
  KEY `idx_status` (`status`),
  KEY `idx_payment_status` (`payment_status`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_shipping_pincode` (`shipping_pincode`),
  CONSTRAINT `fk_orders_buyer` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orders_cancelled_by` FOREIGN KEY (`cancelled_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `order_items`
-- --------------------------------------------------------

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `product_title` varchar(200) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `product_image` varchar(500) DEFAULT NULL,
  `product_sku` varchar(50) DEFAULT NULL,
  `variant_name` varchar(100) DEFAULT NULL,
  `variant_value` varchar(100) DEFAULT NULL,
  `variant_additional_cost` decimal(8,2) DEFAULT 0.00,
  `customizations` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_seller_id` (`seller_id`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_items_seller` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `reviews`
-- --------------------------------------------------------

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `rating` int(1) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `comment` text NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `helpful_count` int(11) DEFAULT 0,
  `reported_count` int(11) DEFAULT 0,
  `seller_response` text DEFAULT NULL,
  `seller_responded_at` timestamp NULL DEFAULT NULL,
  `status` enum('active','hidden','flagged','removed') DEFAULT 'active',
  `moderated` tinyint(1) DEFAULT 0,
  `moderated_by` int(11) DEFAULT NULL,
  `moderated_at` timestamp NULL DEFAULT NULL,
  `moderation_notes` text DEFAULT NULL,
  `sentiment_score` decimal(3,2) DEFAULT NULL,
  `source` enum('web','mobile','api') DEFAULT 'web',
  `user_agent` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_product_buyer` (`product_id`,`buyer_id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_buyer_id` (`buyer_id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_rating` (`rating`),
  KEY `idx_verified` (`verified`),
  KEY `idx_status` (`status`),
  KEY `idx_helpful_count` (`helpful_count`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `fk_reviews_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reviews_buyer` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reviews_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reviews_moderator` FOREIGN KEY (`moderated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `review_images`
-- --------------------------------------------------------

CREATE TABLE `review_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `review_id` int(11) NOT NULL,
  `url` varchar(500) NOT NULL,
  `alt_text` varchar(200) DEFAULT NULL,
  `cloudinary_id` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_review_id` (`review_id`),
  CONSTRAINT `fk_review_images` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `review_helpful`
-- --------------------------------------------------------

CREATE TABLE `review_helpful` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_review_user` (`review_id`,`user_id`),
  KEY `idx_review_id` (`review_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `fk_helpful_review` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_helpful_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `categories`
-- --------------------------------------------------------

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL UNIQUE,
  `description` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `sort_order` int(3) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `meta_title` varchar(60) DEFAULT NULL,
  `meta_description` varchar(160) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_parent_id` (`parent_id`),
  KEY `idx_is_active` (`is_active`),
  CONSTRAINT `fk_categories_parent` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `wishlists`
-- --------------------------------------------------------

CREATE TABLE `wishlists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_product` (`user_id`,`product_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_product_id` (`product_id`),
  CONSTRAINT `fk_wishlist_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wishlist_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `coupons`
-- --------------------------------------------------------

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL UNIQUE,
  `type` enum('percentage','fixed') NOT NULL,
  `value` decimal(8,2) NOT NULL,
  `minimum_amount` decimal(10,2) DEFAULT NULL,
  `maximum_discount` decimal(8,2) DEFAULT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `used_count` int(11) DEFAULT 0,
  `valid_from` timestamp NOT NULL,
  `valid_until` timestamp NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_code` (`code`),
  KEY `idx_valid_dates` (`valid_from`,`valid_until`),
  KEY `idx_is_active` (`is_active`),
  CONSTRAINT `fk_coupons_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Insert sample data
-- --------------------------------------------------------

-- Insert sample categories
INSERT INTO `categories` (`name`, `slug`, `description`, `sort_order`, `is_active`) VALUES
('Handicrafts', 'handicrafts', 'Traditional handmade crafts and artifacts', 1, 1),
('Textiles', 'textiles', 'Handwoven fabrics and clothing', 2, 1),
('Agro Products', 'agro-products', 'Fresh agricultural products and organic foods', 3, 1),
('Local Foods', 'local-foods', 'Traditional and regional food products', 4, 1),
('Jewelry', 'jewelry', 'Traditional and contemporary jewelry pieces', 5, 1),
('Pottery', 'pottery', 'Handmade ceramic and clay products', 6, 1),
('Woodwork', 'woodwork', 'Wooden crafts and furniture', 7, 1),
('Metalwork', 'metalwork', 'Metal crafts and decorative items', 8, 1);

-- Insert sample admin user
INSERT INTO `users` (`firebase_uid`, `name`, `email`, `role`, `verified`, `status`, `city`, `state`, `created_at`) VALUES
('admin_firebase_uid_123', 'Admin User', 'admin@ruralreach.com', 'admin', 1, 'active', 'Mumbai', 'Maharashtra', NOW());

-- Insert sample entrepreneur
INSERT INTO `users` (`firebase_uid`, `name`, `email`, `phone`, `role`, `verified`, `status`, `city`, `state`, `pincode`, `business_name`, `business_type`, `business_description`, `created_at`) VALUES
('entrepreneur_uid_456', 'Sawantwadi Artisans Co-op', 'artisans@sawantwadi.com', '9876543210', 'entrepreneur', 1, 'active', 'Sawantwadi', 'Maharashtra', '416510', 'Sawantwadi Artisans Co-op', 'handicrafts', 'Traditional wooden toy makers from Sawantwadi, Maharashtra', NOW());

-- Insert sample product (Sawantwadi Wooden Toys)
INSERT INTO `products` (`seller_id`, `title`, `slug`, `description`, `category`, `current_price`, `original_price`, `stock`, `location`, `verified`, `featured`, `status`, `material`, `age_group`, `created_at`) VALUES
(2, 'Handcrafted Sawantwadi Wooden Toys', 'handcrafted-sawantwadi-wooden-toys-' + UNIX_TIMESTAMP(), 'Authentic hand-painted wooden toys crafted by artisans from Sawantwadi, Maharashtra — known for vibrant colors, durability, and cultural heritage.', 'handicrafts', 750.00, 999.00, 25, 'Sawantwadi, Sindhudurg District, Maharashtra', 1, 1, 'active', 'Sustainable Wood', '3-5', NOW());

-- Insert sample buyer
INSERT INTO `users` (`firebase_uid`, `name`, `email`, `phone`, `role`, `verified`, `status`, `city`, `state`, `created_at`) VALUES
('buyer_uid_789', 'Priya Sharma', 'priya@example.com', '9123456789', 'buyer', 1, 'active', 'Mumbai', 'Maharashtra', NOW());

COMMIT;
