-- CreateTable
CREATE TABLE "Blog" (
    "blog_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("blog_id")
);

-- CreateTable
CREATE TABLE "Blogs" (
    "current_blog_id" SERIAL NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("current_blog_id")
);

-- CreateTable
CREATE TABLE "_BlogToBlogs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlogToBlogs_AB_unique" ON "_BlogToBlogs"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogToBlogs_B_index" ON "_BlogToBlogs"("B");

-- AddForeignKey
ALTER TABLE "_BlogToBlogs" ADD CONSTRAINT "_BlogToBlogs_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("blog_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToBlogs" ADD CONSTRAINT "_BlogToBlogs_B_fkey" FOREIGN KEY ("B") REFERENCES "Blogs"("current_blog_id") ON DELETE CASCADE ON UPDATE CASCADE;
