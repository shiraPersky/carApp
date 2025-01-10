/*
  Warnings:

  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Car";

-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "license_plate" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "emission_group" TEXT,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "trim_level" TEXT,
    "last_test" TIMESTAMP(3) NOT NULL,
    "model_type" TEXT NOT NULL,
    "model_number" TEXT NOT NULL,
    "odometer" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reminders" (
    "id" SERIAL NOT NULL,
    "license_plate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "due_date" TIMESTAMP(3),
    "next_due_km" INTEGER,
    "repeat_by_days" INTEGER,
    "repeat_by_km" INTEGER,
    "notify_before_days" INTEGER,
    "notify_before_km" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reminders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_license_plate_key" ON "cars"("license_plate");

-- AddForeignKey
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_license_plate_fkey" FOREIGN KEY ("license_plate") REFERENCES "cars"("license_plate") ON DELETE RESTRICT ON UPDATE CASCADE;
