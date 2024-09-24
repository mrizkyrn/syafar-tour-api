-- DropForeignKey
ALTER TABLE `product_category` DROP FOREIGN KEY `product_category_product_id_fkey`;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `product_category_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
