-- AlterTable
ALTER TABLE "Contract" ALTER COLUMN "includeCL" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL;
