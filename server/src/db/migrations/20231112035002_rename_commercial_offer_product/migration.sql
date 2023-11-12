/*
  Warnings:

  - You are about to drop the `CommercialOfferProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommercialOfferProduct" DROP CONSTRAINT "CommercialOfferProduct_commercialOfferId_fkey";

-- DropTable
DROP TABLE "CommercialOfferProduct";

-- CreateTable
CREATE TABLE "CommercialOfferService" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "commercialOfferId" TEXT NOT NULL,

    CONSTRAINT "CommercialOfferService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommercialOfferService" ADD CONSTRAINT "CommercialOfferService_commercialOfferId_fkey" FOREIGN KEY ("commercialOfferId") REFERENCES "CommercialOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
