/*
  Warnings:

  - Added the required column `contractId` to the `ContractOldVersion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContractOldVersion" ADD COLUMN     "contractId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ContractOldVersion" ADD CONSTRAINT "ContractOldVersion_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
