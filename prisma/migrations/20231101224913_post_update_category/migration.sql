/*
  Warnings:

  - You are about to drop the column `category` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" TEXT;
