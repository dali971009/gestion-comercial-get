/*
  Warnings:

  - You are about to drop the column `fullname` on the `ClientContact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClientContact" DROP COLUMN "fullname",
ADD COLUMN     "fullName" TEXT NOT NULL DEFAULT '';
