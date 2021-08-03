/*
  Warnings:

  - You are about to drop the column `userPublicProfileId` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_userPublicProfileId_fkey";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "userPublicProfileId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "has_public_profile" BOOLEAN NOT NULL DEFAULT false;
