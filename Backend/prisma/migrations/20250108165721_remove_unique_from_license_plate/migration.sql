/*
  Warnings:

  - Added the required column `license_plate` to the `Refueling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_plate` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "odometer" INTEGER NOT NULL DEFAULT 0;

-- Step 1: Add the `license_plate` column as optional to Refueling
ALTER TABLE "Refueling" ADD COLUMN "license_plate" TEXT;

-- Step 2: Populate existing rows in Refueling with a default value
UPDATE "Refueling" SET "license_plate" = 'UNKNOWN' WHERE "license_plate" IS NULL;

-- Step 3: Make the column required (NOT NULL) for Refueling
ALTER TABLE "Refueling" ALTER COLUMN "license_plate" SET NOT NULL;

-- Step 1: Add the `license_plate` column as optional to Service
ALTER TABLE "Service" ADD COLUMN "license_plate" TEXT;

-- Step 2: Populate existing rows in Service with a default value
UPDATE "Service" SET "license_plate" = 'UNKNOWN' WHERE "license_plate" IS NULL;

-- Step 3: Make the column required (NOT NULL) for Service
ALTER TABLE "Service" ALTER COLUMN "license_plate" SET NOT NULL;
