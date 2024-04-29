/*
  Warnings:

  - You are about to drop the column `deliveryfee` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "deliveryfee",
ADD COLUMN     "deliveryFee" DECIMAL(10,2);
