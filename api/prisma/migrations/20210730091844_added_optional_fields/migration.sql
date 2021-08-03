/*
  Warnings:

  - Added the required column `is_accepted` to the `friend_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_requested` to the `friend_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "friend_list" ADD COLUMN     "is_accepted" BOOLEAN NOT NULL,
ADD COLUMN     "is_requested" BOOLEAN NOT NULL;
