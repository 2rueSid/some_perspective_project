/*
  Warnings:

  - A unique constraint covering the columns `[user_id,photo_id]` on the table `UserLikes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserLikes.user_id_photo_id_unique" ON "UserLikes"("user_id", "photo_id");
