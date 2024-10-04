/*
  Warnings:

  - You are about to drop the column `name` on the `period` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `period` DROP COLUMN `name`,
    ADD COLUMN `category` ENUM('LOW', 'MID', 'HIGH', 'RAMADHAN', 'ITIKAF') NOT NULL DEFAULT 'LOW';
