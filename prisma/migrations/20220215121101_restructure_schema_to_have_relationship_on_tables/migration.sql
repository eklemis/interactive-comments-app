/*
  Warnings:

  - You are about to drop the column `toUserName` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `mainCommentId` on the `Replies` table. All the data in the column will be lost.
  - You are about to drop the column `repCommentId` on the `Replies` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `Replies` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Replies` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userName` to the `Replies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postedaAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numLikes" INTEGER NOT NULL,
    CONSTRAINT "Comments_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User" ("userName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("content", "id", "numLikes", "postedaAt", "userName") SELECT "content", "id", "numLikes", "postedaAt", "userName" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
CREATE TABLE "new_Replies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    CONSTRAINT "Replies_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User" ("userName") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Replies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "Replies";
ALTER TABLE "new_Replies" RENAME TO "Replies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
