/*
  Warnings:

  - The primary key for the `UseFavoriteRestaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UseFavoriteRestaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UseFavoriteRestaurant" DROP CONSTRAINT "UseFavoriteRestaurant_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UseFavoriteRestaurant_pkey" PRIMARY KEY ("userId", "restaurantId");
