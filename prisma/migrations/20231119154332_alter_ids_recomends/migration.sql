/*
  Warnings:

  - The primary key for the `cluster_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `recomend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[clusterId]` on the table `group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recomendGroupId` to the `recomend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cluster_user` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`, `userId`, `clusterId`);

-- AlterTable
ALTER TABLE `recomend` DROP PRIMARY KEY,
    ADD COLUMN `recomendGroupId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`, `groupId`, `recomendGroupId`);

-- CreateIndex
CREATE UNIQUE INDEX `group_clusterId_key` ON `group`(`clusterId`);

-- AddForeignKey
ALTER TABLE `recomend` ADD CONSTRAINT `recomend_recomendGroupId_fkey` FOREIGN KEY (`recomendGroupId`) REFERENCES `group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
