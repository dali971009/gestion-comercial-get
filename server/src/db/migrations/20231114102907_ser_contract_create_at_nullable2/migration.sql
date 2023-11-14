/*
  Warnings:

  - Made the column `createAt` on table `ContractOldVersion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ContractOldVersion" ALTER COLUMN "createAt" SET NOT NULL;
