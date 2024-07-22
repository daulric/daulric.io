/*
  Warnings:

  - You are about to drop the `Blogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogToBlogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlogToBlogs" DROP CONSTRAINT "_BlogToBlogs_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToBlogs" DROP CONSTRAINT "_BlogToBlogs_B_fkey";

-- DropTable
DROP TABLE "Blogs";

-- DropTable
DROP TABLE "_BlogToBlogs";
