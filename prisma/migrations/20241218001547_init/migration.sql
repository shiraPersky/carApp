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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "license_plate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "odometer" INTEGER NOT NULL,
    "car_type" TEXT NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "engine_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_license_plate_key" ON "Car"("license_plate");
