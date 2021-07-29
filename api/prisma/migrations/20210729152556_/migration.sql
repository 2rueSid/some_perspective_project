/*
  Warnings:

  - The values [TITLE] on the enum `SearchType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SearchType_new" AS ENUM ('USER', 'PHOTO');
ALTER TABLE "search" ALTER COLUMN "type" TYPE "SearchType_new" USING ("type"::text::"SearchType_new");
ALTER TYPE "SearchType" RENAME TO "SearchType_old";
ALTER TYPE "SearchType_new" RENAME TO "SearchType";
DROP TYPE "SearchType_old";
COMMIT;
