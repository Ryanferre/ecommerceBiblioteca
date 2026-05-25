/*
  Warnings:

  - You are about to drop the column `data_limite` on the `Alert` table. All the data in the column will be lost.
  - You are about to drop the column `data_expira_desc` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade_estoque` on the `Book` table. All the data in the column will be lost.
  - Added the required column `book_format` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_num_ratings` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_star_rating` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_url` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "data_limite";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "data_expira_desc",
DROP COLUMN "quantidade_estoque",
ADD COLUMN     "book_format" TEXT NOT NULL,
ADD COLUMN     "delivery" TEXT NOT NULL,
ADD COLUMN     "product_num_ratings" TEXT NOT NULL,
ADD COLUMN     "product_star_rating" TEXT NOT NULL,
ADD COLUMN     "product_url" TEXT NOT NULL;
