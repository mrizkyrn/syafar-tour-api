-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `whatsapp_number` VARCHAR(100) NOT NULL,
    `role` ENUM('ADMIN', 'MITRA', 'USER') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flights` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_mekkah` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel_maddinah` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transportations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `muthawwif` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `handling` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calculations` (
    `id` VARCHAR(191) NOT NULL,
    `number_of_pax` INTEGER NOT NULL,
    `transportation_id` VARCHAR(191) NOT NULL,
    `flight_id` VARCHAR(191) NOT NULL,
    `travel_duration` INTEGER NOT NULL,
    `mekkah_duration` INTEGER NOT NULL,
    `maddinah_duration` INTEGER NOT NULL,
    `hotel_mekkah_id` VARCHAR(191) NOT NULL,
    `hotel_maddinah_id` VARCHAR(191) NOT NULL,
    `muthawwif_id` VARCHAR(191) NOT NULL,
    `handling_id` VARCHAR(191) NOT NULL,
    `total_price` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `calculations` ADD CONSTRAINT `calculations_transportation_id_fkey` FOREIGN KEY (`transportation_id`) REFERENCES `transportations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculations` ADD CONSTRAINT `calculations_flight_id_fkey` FOREIGN KEY (`flight_id`) REFERENCES `flights`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculations` ADD CONSTRAINT `calculations_hotel_mekkah_id_fkey` FOREIGN KEY (`hotel_mekkah_id`) REFERENCES `hotel_mekkah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculations` ADD CONSTRAINT `calculations_hotel_maddinah_id_fkey` FOREIGN KEY (`hotel_maddinah_id`) REFERENCES `hotel_maddinah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculations` ADD CONSTRAINT `calculations_muthawwif_id_fkey` FOREIGN KEY (`muthawwif_id`) REFERENCES `muthawwif`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculations` ADD CONSTRAINT `calculations_handling_id_fkey` FOREIGN KEY (`handling_id`) REFERENCES `handling`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
