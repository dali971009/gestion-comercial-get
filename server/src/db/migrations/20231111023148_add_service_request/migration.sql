-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" TEXT NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "requestingEntityId" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactPosition" TEXT NOT NULL,
    "contactEmail" TEXT,
    "contactPhoneNumber" TEXT,
    "scope" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_requestingEntityId_fkey" FOREIGN KEY ("requestingEntityId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
