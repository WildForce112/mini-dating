/*
  Warnings:

  - You are about to drop the column `fromId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `toId` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fromID,toID]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fromID` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toID` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_fromId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_toId_fkey";

-- DropIndex
DROP INDEX "Like_fromId_toId_key";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "fromId",
DROP COLUMN "toId",
ADD COLUMN     "fromID" INTEGER NOT NULL,
ADD COLUMN     "toID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_fromID_toID_key" ON "Like"("fromID", "toID");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_fromID_fkey" FOREIGN KEY ("fromID") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_toID_fkey" FOREIGN KEY ("toID") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
