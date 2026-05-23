-- CreateTable
CREATE TABLE `inforbook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emailUser` VARCHAR(50) NULL,
    `nameAutorBook` VARCHAR(20) NOT NULL,
    `titleBook` VARCHAR(100) NULL,
    `priceBook` DECIMAL(10, 2) NULL,
    `descriptionBook` TEXT NOT NULL,
    `imgBook` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emailUser` VARCHAR(50) NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `inforbook`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
