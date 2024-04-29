/*
  Warnings:

  - You are about to drop the column `deliveryFree` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "deliveryFree",
ADD COLUMN     "deliveryfee" DECIMAL(10,2);
