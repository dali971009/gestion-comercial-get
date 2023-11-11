/*
  Warnings:

  - Added the required column `number` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "number" INTEGER NOT NULL;
