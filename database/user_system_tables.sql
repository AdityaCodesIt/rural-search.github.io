-- Additional tables for user system, cart, and profile functionality
-- Run this after importing the main database

USE `ruralreach`;

-- --------------------------------------------------------
-- Table structure for table `user_sessions`
-- --------------------------------------------------------

CREATE TABLE `user_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_activity` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `expires_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_token` (`session_token`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_is_active` (`is_active`),
  KEY `idx_expires_at` (`expires_at`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `shopping_cart`
-- --------------------------------------------------------

CREATE TABLE `shopping_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price_at_time` decimal(10,2) NOT NULL,
  `variant_name` varchar(100) DEFAULT NULL,
  `variant_value` varchar(100) DEFAULT NULL,
  `customizations` json DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_product_variant` (`user_id`,`product_id`,`variant_name`,`variant_value`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_added_at` (`added_at`),
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `user_addresses`
-- --------------------------------------------------------

CREATE TABLE `user_addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `address_type` enum('home','work','other') DEFAULT 'home',
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address_line_1` text NOT NULL,
  `address_line_2` text DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `landmark` varchar(200) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_is_default` (`is_default`),
  CONSTRAINT `fk_addresses_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `user_activity_log`
-- --------------------------------------------------------

CREATE TABLE `user_activity_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `activity_type` enum('login','logout','register','profile_update','password_change','order_placed','product_viewed','cart_updated') NOT NULL,
  `description` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_activity_type` (`activity_type`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `fk_activity_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `user_preferences`
-- --------------------------------------------------------

CREATE TABLE `user_preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `preference_key` varchar(100) NOT NULL,
  `preference_value` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_preference` (`user_id`,`preference_key`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `fk_preferences_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Insert sample user data for testing
-- --------------------------------------------------------

-- Insert sample users with different roles
INSERT INTO `users` (`firebase_uid`, `name`, `email`, `phone`, `role`, `verified`, `status`, `city`, `state`, `pincode`, `business_name`, `business_type`, `business_description`) VALUES
('test_buyer_001', 'John Doe', 'john@example.com', '9876543216', 'buyer', 1, 'active', 'Mumbai', 'Maharashtra', '400001', NULL, NULL, NULL),
('test_buyer_002', 'Jane Smith', 'jane@example.com', '9876543217', 'buyer', 1, 'active', 'Delhi', 'Delhi', '110001', NULL, NULL, NULL),
('test_entrepreneur_001', 'Ravi Kumar', 'ravi@craftshop.com', '9876543218', 'entrepreneur', 1, 'active', 'Jaipur', 'Rajasthan', '302001', 'Ravi Handicrafts', 'handicrafts', 'Traditional Rajasthani handicrafts and textiles');

-- Insert sample addresses
INSERT INTO `user_addresses` (`user_id`, `address_type`, `full_name`, `phone`, `address_line_1`, `city`, `state`, `pincode`, `is_default`) VALUES
(12, 'home', 'John Doe', '9876543216', '123 Marine Drive, Nariman Point', 'Mumbai', 'Maharashtra', '400001', 1),
(13, 'home', 'Jane Smith', '9876543217', '456 Connaught Place', 'Delhi', 'Delhi', '110001', 1),
(14, 'work', 'Ravi Kumar', '9876543218', '789 MI Road, C-Scheme', 'Jaipur', 'Rajasthan', '302001', 1);

-- Insert sample cart items
INSERT INTO `shopping_cart` (`user_id`, `product_id`, `quantity`, `price_at_time`) VALUES
(12, 1, 2, 750.00),
(12, 2, 1, 569.00),
(13, 1, 1, 750.00),
(13, 8, 1, 899.00);

-- Insert sample user preferences
INSERT INTO `user_preferences` (`user_id`, `preference_key`, `preference_value`) VALUES
(12, 'theme', 'light'),
(12, 'language', 'en'),
(12, 'email_notifications', 'true'),
(13, 'theme', 'dark'),
(13, 'language', 'hi'),
(13, 'sms_notifications', 'true');

-- Insert sample activity logs
INSERT INTO `user_activity_log` (`user_id`, `activity_type`, `description`, `ip_address`) VALUES
(12, 'register', 'User registered successfully', '192.168.1.100'),
(12, 'login', 'User logged in', '192.168.1.100'),
(12, 'cart_updated', 'Added product to cart', '192.168.1.100'),
(13, 'register', 'User registered successfully', '192.168.1.101'),
(13, 'login', 'User logged in', '192.168.1.101');

COMMIT;
