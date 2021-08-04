-- AddForeignKey
ALTER TABLE "message" ADD FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
