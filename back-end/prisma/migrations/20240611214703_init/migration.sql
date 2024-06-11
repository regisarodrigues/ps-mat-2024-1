-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `year_manufacture` INTEGER NOT NULL,
    `imported` BOOLEAN NOT NULL DEFAULT false,
    `plates` VARCHAR(191) NOT NULL,
    `selling_date` DATETIME(3) NULL,
    `selling_price` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `ident_document` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NULL,
    `street_name` VARCHAR(191) NOT NULL,
    `house_number` VARCHAR(191) NOT NULL,
    `complements` VARCHAR(191) NULL,
    `municipality` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seller` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `identity_document` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `is_manager` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Seller_identity_document_key`(`identity_document`),
    UNIQUE INDEX `Seller_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
