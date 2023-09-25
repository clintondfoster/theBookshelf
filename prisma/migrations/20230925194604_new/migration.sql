/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "imgUrl",
ADD COLUMN     "genre" TEXT;
