-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "service_type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "odometer" INTEGER NOT NULL,
    "place" TEXT NOT NULL,
    "driver" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "file_attachment" TEXT,
    "cost" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "reminderKilometers" INTEGER,
    "reminderMonths" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
