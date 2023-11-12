-- CreateTable
CREATE TABLE "CommercialOffer" (
    "id" TEXT NOT NULL,
    "serviceRequestId" TEXT,
    "clientId" TEXT NOT NULL,
    "wayToPay" INTEGER NOT NULL,
    "minimumRequirements" TEXT,

    CONSTRAINT "CommercialOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommercialOfferProduct" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "commercialOfferId" TEXT NOT NULL,

    CONSTRAINT "CommercialOfferProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommercialOffer" ADD CONSTRAINT "CommercialOffer_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommercialOffer" ADD CONSTRAINT "CommercialOffer_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommercialOfferProduct" ADD CONSTRAINT "CommercialOfferProduct_commercialOfferId_fkey" FOREIGN KEY ("commercialOfferId") REFERENCES "CommercialOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
