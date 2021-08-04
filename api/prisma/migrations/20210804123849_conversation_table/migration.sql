/*
  Warnings:

  - Added the required column `conversation_id` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN     "conversation_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "conversation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "recepient_id" INTEGER NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conversation.recepient_id_user_id_unique" ON "conversation"("recepient_id", "user_id");

-- AddForeignKey
ALTER TABLE "conversation" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
