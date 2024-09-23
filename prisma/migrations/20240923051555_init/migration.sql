-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `whatsapp_number` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'MITRA', 'USER') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_type` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `service_type_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_service` (
    `id` VARCHAR(191) NOT NULL,
    `service_type_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `order_number` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Calculation` (
    `id` VARCHAR(191) NOT NULL,
    `number_of_pax` INTEGER NOT NULL,
    `transportation_id` VARCHAR(191) NOT NULL,
    `flight_id` VARCHAR(191) NOT NULL,
    `travel_duration` INTEGER NOT NULL,
    `mekkah_duration` INTEGER NOT NULL,
    `madinah_duration` INTEGER NOT NULL,
    `hotel_mekkah_id` VARCHAR(191) NOT NULL,
    `hotel_madinah_id` VARCHAR(191) NOT NULL,
    `muthawif_id` VARCHAR(191) NOT NULL,
    `handling_id` VARCHAR(191) NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `per_pax_price` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_service` ADD CONSTRAINT `user_service_service_type_id_fkey` FOREIGN KEY (`service_type_id`) REFERENCES `service_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calculation` ADD CONSTRAINT `Calculation_transportation_id_fkey` FOREIGN KEY (`transportation_id`) REFERENCES `user_service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calculation` ADD CONSTRAINT `Calculation_flight_id_fkey` FOREIGN KEY (`flight_id`) REFERENCES `user_service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calculation` ADD CONSTRAINT `Calculation_hotel_mekkah_id_fkey` FOREIGN KEY (`hotel_mekkah_id`) REFERENCES `user_service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calculation` ADD CONSTRAINT `Calculation_hotel_madinah_id_fkey` FOREIGN KEY (`hotel_madinah_id`) REFERENCES `user_service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calculation` ADD CONSTRAINT `Calculation_muthawif_id_fkey` FOREIGN KEY (`muthawif_id`) REFERENCES `user_service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calculation` ADD CONSTRAINT `Calculation_handling_id_fkey` FOREIGN KEY (`handling_id`) REFERENCES `user_service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
