/*
  Warnings:

  - A unique constraint covering the columns `[user_id,conversation_id]` on the table `conversation_recepient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "message.conversation_id_user_id_unique";

-- CreateIndex
CREATE UNIQUE INDEX "conversation_recepient.user_id_conversation_id_unique" ON "conversation_recepient"("user_id", "conversation_id");
