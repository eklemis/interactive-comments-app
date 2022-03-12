-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postedaAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numLikes" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'MAIN',
    CONSTRAINT "Comments_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User" ("userName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("content", "id", "numLikes", "postedaAt", "userName") SELECT "content", "id", "numLikes", "postedaAt", "userName" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
