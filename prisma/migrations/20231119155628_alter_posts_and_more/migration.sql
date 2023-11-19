-- AlterTable
ALTER TABLE `posts` ADD COLUMN `file` VARCHAR(191) NULL,
    MODIFY `content` VARCHAR(255) NULL;
