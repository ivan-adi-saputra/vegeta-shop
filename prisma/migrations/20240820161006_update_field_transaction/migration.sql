/*
  Warnings:

  - You are about to drop the column `grend_total_price` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `grend_total_price`,
    ADD COLUMN `grand_total_price` INTEGER UNSIGNED NOT NULL DEFAULT 0;
