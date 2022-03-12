/*
  Warnings:

  - You are about to drop the column `userName` on the `Replies` table. All the data in the column will be lost.
  - Added the required column `parentCommentId` to the `Replies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Replies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "parentCommentId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    CONSTRAINT "Replies_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Replies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Replies" ("commentId", "id") SELECT "commentId", "id" FROM "Replies";
DROP TABLE "Replies";
ALTER TABLE "new_Replies" RENAME TO "Replies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
