/*
  Warnings:

  - You are about to drop the column `name` on the `cluster_user` table. All the data in the column will be lost.
  - Added the required column `name` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cluster_user` DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `group` ADD COLUMN `name` VARCHAR(191) NOT NULL;
