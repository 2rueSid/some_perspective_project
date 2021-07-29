/*
  Warnings:

  - A unique constraint covering the columns `[searchable_id,type]` on the table `search` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "search.searchable_id_type_unique" ON "search"("searchable_id", "type");
