-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "imagePng" TEXT NOT NULL,
    "imageWebp" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postedaAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "toUser" TEXT NOT NULL DEFAULT '',
    "numLikes" INTEGER NOT NULL
);
