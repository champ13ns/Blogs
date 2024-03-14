/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "Name" TEXT NOT NULL,
    "ModelNumber" TEXT NOT NULL,
    "CarNumber" SERIAL NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("CarNumber")
);

-- CreateTable
CREATE TABLE "Key" (
    "CarId" INTEGER NOT NULL,
    "Alram" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Key_CarId_key" ON "Key"("CarId");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_CarId_fkey" FOREIGN KEY ("CarId") REFERENCES "Car"("CarNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
