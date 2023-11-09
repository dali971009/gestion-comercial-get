-- CreateTable
CREATE TABLE "ClientContact" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "ClientContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "officialName" TEXT NOT NULL,
    "acronym" TEXT,
    "creationDate" TIMESTAMP(3),
    "organism" TEXT,
    "osdeGroupUnion" TEXT,
    "company" TEXT,
    "codeREEUP" TEXT,
    "nit" TEXT,
    "commercialRegister" TEXT,
    "address" TEXT,
    "municipality" TEXT,
    "province" TEXT,
    "status" INTEGER NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "bank" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientContact" ADD CONSTRAINT "ClientContact_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
