/*
  Warnings:

  - You are about to drop the column `user_id` on the `user_package_order` table. All the data in the column will be lost.
  - Added the required column `email` to the `user_package_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `user_package_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp_number` to the `user_package_order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_package_order` DROP FOREIGN KEY `user_package_order_user_id_fkey`;

-- AlterTable
ALTER TABLE `user_package_order` DROP COLUMN `user_id`,
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `full_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `whatsapp_number` VARCHAR(255) NOT NULL;
