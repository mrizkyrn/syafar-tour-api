-- DropForeignKey
ALTER TABLE `product_category` DROP FOREIGN KEY `product_category_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `product_exclude` DROP FOREIGN KEY `product_exclude_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `product_image` DROP FOREIGN KEY `product_image_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `product_include` DROP FOREIGN KEY `product_include_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `product_variation` DROP FOREIGN KEY `product_variation_product_id_fkey`;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `product_category_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variation` ADD CONSTRAINT `product_variation_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_include` ADD CONSTRAINT `product_include_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_exclude` ADD CONSTRAINT `product_exclude_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
