-- AlterTable
ALTER TABLE "ClientContact" ADD COLUMN     "number" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "CommercialOffer" ADD COLUMN     "number" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "CommercialOfferService" ADD COLUMN     "number" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "number" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "ServiceType" ADD COLUMN     "number" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "number" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "number" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identificationOfTheParts" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "type" INTEGER NOT NULL,
    "includeCL" BOOLEAN NOT NULL,
    "agreedAdvance" DECIMAL(65,30) NOT NULL,
    "wayToPay" INTEGER NOT NULL,
    "signatureDate" TIMESTAMP(3),
    "validity" TIMESTAMP(3),
    "legalOpinion" TEXT,
    "agreement" TEXT,
    "observations" TEXT,
    "isPreform" BOOLEAN NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractOldVersion" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "identificationOfTheParts" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "type" INTEGER NOT NULL,
    "includeCL" BOOLEAN NOT NULL,
    "agreedAdvance" DECIMAL(65,30) NOT NULL,
    "wayToPay" INTEGER NOT NULL,
    "signatureDate" TIMESTAMP(3) NOT NULL,
    "validity" TIMESTAMP(3) NOT NULL,
    "legalOpinion" TEXT,
    "agreement" TEXT,
    "observations" TEXT,

    CONSTRAINT "ContractOldVersion_pkey" PRIMARY KEY ("id")
);
