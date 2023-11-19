/*
  Warnings:

  - You are about to drop the column `userId` on the `cluster` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `cluster` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cluster` DROP FOREIGN KEY `cluster_userId_fkey`;

-- AlterTable
ALTER TABLE `cluster` DROP COLUMN `userId`,
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `cluster` ADD CONSTRAINT `cluster_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
