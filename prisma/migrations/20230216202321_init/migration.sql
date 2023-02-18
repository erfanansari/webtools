-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bookmarked" BOOLEAN DEFAULT false,
    "tag" TEXT NOT NULL DEFAULT 'Other'
);
INSERT INTO "new_Tool" ("bookmarked", "createdAt", "description", "id", "image", "name", "updatedAt", "url") SELECT "bookmarked", "createdAt", "description", "id", "image", "name", "updatedAt", "url" FROM "Tool";
DROP TABLE "Tool";
ALTER TABLE "new_Tool" RENAME TO "Tool";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
