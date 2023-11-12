/*
  Warnings:

  - You are about to drop the column `description` on the `CommercialOfferService` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `CommercialOfferService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommercialOfferService" DROP COLUMN "description",
ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CommercialOfferService" ADD CONSTRAINT "CommercialOfferService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
