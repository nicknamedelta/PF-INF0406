/*
  Warnings:

  - A unique constraint covering the columns `[abbreviation]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `abbreviation` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Department_name_key";

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "abbreviation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Department_abbreviation_key" ON "Department"("abbreviation");
