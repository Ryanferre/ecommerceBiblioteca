/*
  Warnings:

  - Changed the type of `preco_original` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `preco_desconto` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "preco_original",
ADD COLUMN     "preco_original" DECIMAL(10,2) NOT NULL,
DROP COLUMN "preco_desconto",
ADD COLUMN     "preco_desconto" DECIMAL(10,2) NOT NULL;
