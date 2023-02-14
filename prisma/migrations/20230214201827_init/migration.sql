/*
  Warnings:

  - You are about to drop the column `email` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Example` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bookmarked" BOOLEAN NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Example" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Example" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Example";
DROP TABLE "Example";
ALTER TABLE "new_Example" RENAME TO "Example";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
