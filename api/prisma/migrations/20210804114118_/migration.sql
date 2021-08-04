-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "is_edited" BOOLEAN DEFAULT false,
    "is_seen" BOOLEAN DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "message" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
