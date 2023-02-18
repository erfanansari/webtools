/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Tool` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tool_url_key" ON "Tool"("url");
