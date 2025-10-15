-- Sample Data for RuralReach Database
-- Run this after importing the main database structure

USE `ruralreach`;

-- Insert more sample users
INSERT INTO `users` (`firebase_uid`, `name`, `email`, `phone`, `role`, `verified`, `status`, `city`, `state`, `pincode`, `business_name`, `business_type`, `business_description`) VALUES
('ent_001', 'Kidology Crafts', 'contact@kidology.com', '9876543211', 'entrepreneur', 1, 'active', 'Sawantwadi', 'Maharashtra', '416510', 'Kidology Educational Toys', 'handicrafts', 'Educational wooden toys and Montessori materials'),
('ent_002', 'Nesta Toys', 'info@nestatoys.com', '9876543212', 'entrepreneur', 1, 'active', 'Sawantwadi', 'Maharashtra', '416510', 'NESTA Educational Toys', 'handicrafts', 'Premium wooden educational toys and kitchen sets'),
('ent_003', 'CrafToys Sawantwadi', 'hello@craftoys.com', '9876543213', 'entrepreneur', 1, 'active', 'Sawantwadi', 'Maharashtra', '416510', 'CrafToys Traditional', 'handicrafts', 'Traditional spinning tops and wooden games'),
('ent_004', 'Trinkets & More', 'support@trinketsmore.com', '9876543214', 'entrepreneur', 1, 'active', 'Sawantwadi', 'Maharashtra', '416510', 'Trinkets & More Crafts', 'handicrafts', 'Handcrafted wooden toys and educational materials'),
('buyer_001', 'Rajesh Kumar', 'rajesh@example.com', '9123456780', 'buyer', 1, 'active', 'Pune', 'Maharashtra', '411001', NULL, NULL, NULL),
('buyer_002', 'Anita Desai', 'anita@example.com', '9123456781', 'buyer', 1, 'active', 'Mumbai', 'Maharashtra', '400001', NULL, NULL, NULL),
('buyer_003', 'Vikram Singh', 'vikram@example.com', '9123456782', 'buyer', 1, 'active', 'Bangalore', 'Karnataka', '560001', NULL, NULL, NULL),
('buyer_004', 'Meera Patel', 'meera@example.com', '9123456783', 'buyer', 1, 'active', 'Ahmedabad', 'Gujarat', '380001', NULL, NULL, NULL);

-- Insert sample products
INSERT INTO `products` (`seller_id`, `title`, `slug`, `description`, `category`, `current_price`, `original_price`, `stock`, `location`, `verified`, `featured`, `status`, `material`, `age_group`, `sku`) VALUES
(3, 'Kidology Wooden Magnetic Fishing Game', 'kidology-magnetic-fishing-game-001', 'Educational wooden puzzle with Montessori alphabets. Fun educational toy for toddlers aged 3+ years.', 'handicrafts', 569.00, 795.00, 20, 'Sawantwadi, Maharashtra', 1, 1, 'active', 'Natural Wood', '3-5', 'KID001'),
(4, 'Nesta Toys Wooden Bread Pop-up Toaster', 'nesta-wooden-toaster-002', 'Kitchen set toy with pretend play toys for kids 3+. Blue colored wooden toaster set.', 'handicrafts', 1186.00, 1499.00, 12, 'Sawantwadi, Maharashtra', 1, 1, 'active', 'Natural Wood', '3-5', 'NES002'),
(5, 'CrafToys Wooden Spinning Tops 5 Types', 'craftoys-spinning-tops-003', 'Traditional wooden spinning tops with magic top, finger top and apple top designs. Hand-painted in vibrant colors.', 'handicrafts', 299.00, 399.00, 15, 'Sawantwadi, Maharashtra', 1, 1, 'active', 'Natural Wood', '3-5', 'CRA003'),
(6, 'Trinkets & More Wooden Hammer Ball', 'trinkets-hammer-ball-004', 'Wooden hammer ball knock pounding bench with box cage fine motor and dexterity skills toy.', 'handicrafts', 299.00, 450.00, 18, 'Sawantwadi, Maharashtra', 1, 0, 'active', 'Natural Wood', '3-5', 'TRI004'),
(3, 'Kidology 7-in-1 Montessori Busy Board', 'kidology-busy-board-005', 'Wooden sensory busy cube with fidget spinner, switches and educational activities for toddlers.', 'handicrafts', 699.00, 999.00, 14, 'Sawantwadi, Maharashtra', 1, 1, 'active', 'Natural Wood', '3-5', 'KID005'),
(4, 'NESTA TOYS Wooden Tool Kit Set', 'nesta-tool-kit-006', 'Tool box with 37 pieces pretend play portable construction tools kit toys for kids.', 'handicrafts', 1649.00, 2399.00, 8, 'Sawantwadi, Maharashtra', 1, 1, 'active', 'Natural Wood', '6-12', 'NES006'),
(2, 'GUBBACHHI Wooden Stacker Toy Gateway of India', 'gubbachhi-stacker-007', 'Natural Mango Wood handmade and handpainted stacker toy. Educational puzzle toy for gifting.', 'handicrafts', 899.00, 1299.00, 12, 'Mumbai, Maharashtra', 1, 1, 'active', 'Mango Wood', '2-5', 'GUB007'),
(5, 'Channapatna Toys Wooden Train with Tiger Doll', 'channapatna-train-008', 'Wooden Train for 12 Months & Above Kids. Multicolor with attached string to encourage walking.', 'handicrafts', 649.00, 899.00, 20, 'Channapatna, Karnataka', 1, 1, 'active', 'Natural Wood', '0-2', 'CHA008');

-- Insert product images
INSERT INTO `product_images` (`product_id`, `url`, `alt_text`, `is_primary`, `sort_order`) VALUES
(1, '/images/products/sawantwadi-wooden-toys.svg', 'Handcrafted Sawantwadi Wooden Toys', 1, 1),
(2, '/images/products/magnetic-fishing-kidology.webp', 'Kidology Magnetic Fishing Game', 1, 1),
(3, '/images/products/wooden-toaster-nesta.webp', 'Nesta Wooden Toaster Set', 1, 1),
(4, '/images/products/spinning-tops-craftoys.webp', 'CrafToys Spinning Tops', 1, 1),
(5, '/images/products/hammer-ball-trinkets.webp', 'Trinkets Hammer Ball Toy', 1, 1),
(6, '/images/products/montessori-busy-board-kidology.webp', 'Kidology Busy Board', 1, 1),
(7, '/images/products/wooden-tool-kit-nesta.webp', 'NESTA Tool Kit Set', 1, 1),
(8, '/images/products/gubbachhi-wooden-stacker.webp', 'GUBBACHHI Stacker Toy', 1, 1),
(9, '/images/products/channapatna-wooden-train.jpg', 'Channapatna Wooden Train', 1, 1);

-- Insert sample orders
INSERT INTO `orders` (`order_number`, `buyer_id`, `subtotal`, `shipping_cost`, `tax_amount`, `total_amount`, `shipping_full_name`, `shipping_phone`, `shipping_email`, `shipping_address`, `shipping_city`, `shipping_state`, `shipping_pincode`, `payment_method`, `payment_status`, `status`) VALUES
('RR20241001001', 7, 1186.00, 50.00, 213.48, 1449.48, 'Rajesh Kumar', '9123456780', 'rajesh@example.com', '123 MG Road, Koregaon Park', 'Pune', 'Maharashtra', '411001', 'upi', 'completed', 'delivered'),
('RR20241002002', 8, 699.00, 50.00, 125.82, 874.82, 'Anita Desai', '9123456781', 'anita@example.com', '456 Linking Road, Bandra', 'Mumbai', 'Maharashtra', '400001', 'card', 'completed', 'shipped'),
('RR20241003003', 9, 299.00, 50.00, 53.82, 402.82, 'Vikram Singh', '9123456782', 'vikram@example.com', '789 Brigade Road', 'Bangalore', 'Karnataka', '560001', 'cod', 'pending', 'processing');

-- Insert order items
INSERT INTO `order_items` (`order_id`, `product_id`, `seller_id`, `product_title`, `product_price`, `quantity`, `subtotal`, `product_image`, `product_sku`) VALUES
(1, 3, 4, 'Nesta Toys Wooden Bread Pop-up Toaster', 1186.00, 1, 1186.00, '/images/products/wooden-toaster-nesta.webp', 'NES002'),
(2, 6, 3, 'Kidology 7-in-1 Montessori Busy Board', 699.00, 1, 699.00, '/images/products/montessori-busy-board-kidology.webp', 'KID005'),
(3, 4, 5, 'CrafToys Wooden Spinning Tops 5 Types', 299.00, 1, 299.00, '/images/products/spinning-tops-craftoys.webp', 'CRA003');

-- Insert sample reviews
INSERT INTO `reviews` (`product_id`, `buyer_id`, `order_id`, `rating`, `title`, `comment`, `verified`, `helpful_count`, `status`) VALUES
(1, 7, 1, 5, 'Excellent Quality!', 'Beautiful craftsmanship! My daughter loves these toys. The colors are vibrant and the quality is excellent.', 1, 15, 'active'),
(1, 8, 2, 5, 'Authentic Sawantwadi Toys', 'Authentic Sawantwadi toys. Great to support local artisans. Fast delivery and well packaged.', 1, 12, 'active'),
(1, 9, 3, 4, 'Good Quality', 'Good quality toys. My kids enjoy playing with them. Slightly expensive but worth it for the craftsmanship.', 1, 8, 'active'),
(2, 7, 1, 5, 'Educational and Fun', 'Perfect educational toy for my 4-year-old. Helps with learning alphabets while having fun.', 1, 10, 'active'),
(3, 8, 2, 5, 'Great Kitchen Set', 'Amazing pretend play kitchen set. My son loves making breakfast with this toaster!', 1, 7, 'active'),
(4, 9, 3, 4, 'Traditional Spinning Tops', 'Nice traditional toys. Brings back childhood memories. Good quality wood.', 1, 5, 'active');

-- Update product ratings based on reviews
UPDATE `products` SET 
  `rating_average` = 4.67,
  `rating_count` = 3,
  `rating_4_star` = 1,
  `rating_5_star` = 2
WHERE `id` = 1;

UPDATE `products` SET 
  `rating_average` = 5.00,
  `rating_count` = 1,
  `rating_5_star` = 1
WHERE `id` = 2;

UPDATE `products` SET 
  `rating_average` = 5.00,
  `rating_count` = 1,
  `rating_5_star` = 1
WHERE `id` = 3;

UPDATE `products` SET 
  `rating_average` = 4.00,
  `rating_count` = 1,
  `rating_4_star` = 1
WHERE `id` = 4;

-- Insert sample wishlists
INSERT INTO `wishlists` (`user_id`, `product_id`) VALUES
(7, 6), -- Rajesh wants Kidology Busy Board
(7, 7), -- Rajesh wants NESTA Tool Kit
(8, 8), -- Anita wants GUBBACHHI Stacker
(9, 2), -- Vikram wants Kidology Fishing Game
(10, 1); -- Meera wants Sawantwadi Toys

-- Insert sample coupons
INSERT INTO `coupons` (`code`, `type`, `value`, `minimum_amount`, `usage_limit`, `valid_from`, `valid_until`, `created_by`) VALUES
('WELCOME10', 'percentage', 10.00, 500.00, 100, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1),
('RURAL50', 'fixed', 50.00, 1000.00, 50, NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY), 1),
('FIRSTBUY', 'percentage', 15.00, 300.00, 200, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY), 1);

-- Update user statistics
UPDATE `users` SET 
  `total_orders` = 1,
  `total_spent` = 1449.48
WHERE `id` = 7;

UPDATE `users` SET 
  `total_orders` = 1,
  `total_spent` = 874.82
WHERE `id` = 8;

UPDATE `users` SET 
  `total_sales` = 1,
  `total_revenue` = 1186.00,
  `rating_average` = 5.00,
  `rating_count` = 1
WHERE `id` = 4; -- Nesta Toys

UPDATE `users` SET 
  `total_sales` = 1,
  `total_revenue` = 699.00,
  `rating_average` = 5.00,
  `rating_count` = 2
WHERE `id` = 3; -- Kidology

-- Add some product views and likes
UPDATE `products` SET `views` = 156, `likes` = 23 WHERE `id` = 1;
UPDATE `products` SET `views` = 89, `likes` = 15 WHERE `id` = 2;
UPDATE `products` SET `views` = 134, `likes` = 19 WHERE `id` = 3;
UPDATE `products` SET `views` = 78, `likes` = 12 WHERE `id` = 4;
UPDATE `products` SET `views` = 203, `likes` = 31 WHERE `id` = 6;
UPDATE `products` SET `views` = 167, `likes` = 25 WHERE `id` = 7;
