/*
  Warnings:

  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "points",
ADD COLUMN     "coutry" TEXT,
ADD COLUMN     "region" TEXT;
