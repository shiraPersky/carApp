/*
  Warnings:

  - You are about to drop the column `car_type` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `engine_number` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `fuel_type` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `odometer` on the `Car` table. All the data in the column will be lost.
  - Added the required column `last_test` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model_number` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model_type` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valid_until` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "car_type",
DROP COLUMN "engine_number",
DROP COLUMN "fuel_type",
DROP COLUMN "odometer",
ADD COLUMN     "emission_group" TEXT,
ADD COLUMN     "last_test" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "model_number" TEXT NOT NULL,
ADD COLUMN     "model_type" TEXT NOT NULL,
ADD COLUMN     "trim_level" TEXT,
ADD COLUMN     "valid_until" TIMESTAMP(3) NOT NULL;
