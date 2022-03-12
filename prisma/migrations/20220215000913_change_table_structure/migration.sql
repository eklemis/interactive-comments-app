/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `toUser` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comments` table. All the data in the column will be lost.
  - Added the required column `userName` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Replies" (
    "mainCommentId" TEXT NOT NULL,
    "repCommentId" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userName" TEXT NOT NULL,
    "imagePng" TEXT NOT NULL,
    "imageWebp" TEXT NOT NULL
);
INSERT INTO "new_User" ("imagePng", "imageWebp", "userName") SELECT "imagePng", "imageWebp", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
CREATE TABLE "new_Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postedaAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "toUserName" TEXT NOT NULL DEFAULT '',
    "numLikes" INTEGER NOT NULL
);
INSERT INTO "new_Comments" ("content", "id", "numLikes", "postedaAt") SELECT "content", "id", "numLikes", "postedaAt" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Replies_mainCommentId_repCommentId_key" ON "Replies"("mainCommentId", "repCommentId");
