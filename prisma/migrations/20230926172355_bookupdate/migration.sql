/*
  Warnings:

  - You are about to alter the column `price` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Integer`.
  - You are about to alter the column `price` on the `cart` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Integer`.
  - Made the column `title` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `cart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `cart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `cart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `cart` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "author" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "quantity" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "streetAddress" DROP NOT NULL,
ALTER COLUMN "zipCode" DROP NOT NULL;
