/*
  Warnings:

  - You are about to alter the column `rating` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `name` CHAR(255) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Review` MODIFY `author` CHAR(255) NOT NULL,
    MODIFY `rating` TINYINT NOT NULL,
    MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Summary` MODIFY `content` TEXT NOT NULL;
