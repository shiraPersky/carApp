-- CreateTable
CREATE TABLE "Refueling" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "odometer" INTEGER NOT NULL,
    "kindOfFuel" TEXT NOT NULL,
    "pricePerLiter" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "liters" DOUBLE PRECISION NOT NULL,
    "gasStation" TEXT NOT NULL,
    "driver" TEXT NOT NULL,
    "fileAttachment" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Refueling_pkey" PRIMARY KEY ("id")
);
