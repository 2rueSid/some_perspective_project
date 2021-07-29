-- CreateEnum
CREATE TYPE "SearchType" AS ENUM ('TAG', 'USER', 'TITLE');

-- CreateTable
CREATE TABLE "search" (
    "id" SERIAL NOT NULL,
    "type" "SearchType" NOT NULL,
    "searchable" TEXT NOT NULL,
    "searchable_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
