/*
  Warnings:

  - Added the required column `receiver_id` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN     "receiver_id" INTEGER NOT NULL;
