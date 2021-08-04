/*
  Warnings:

  - You are about to drop the column `recepient_id` on the `conversation` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `conversation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[conversation_id,user_id]` on the table `message` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "conversation" DROP CONSTRAINT "conversation_user_id_fkey";

-- DropIndex
DROP INDEX "conversation.recepient_id_user_id_unique";

-- AlterTable
ALTER TABLE "conversation" DROP COLUMN "recepient_id",
DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "conversation_recepient" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conversation_recepient.user_id_conversation_id_unique" ON "conversation_recepient"("user_id", "conversation_id");

-- CreateIndex
CREATE UNIQUE INDEX "message.conversation_id_user_id_unique" ON "message"("conversation_id", "user_id");

-- AddForeignKey
ALTER TABLE "conversation_recepient" ADD FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_recepient" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
