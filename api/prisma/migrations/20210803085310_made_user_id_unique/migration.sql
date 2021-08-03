/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `user_public_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_public_profile.user_id_unique" ON "user_public_profile"("user_id");
