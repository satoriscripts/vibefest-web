import type { posts, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export type Posts = {
  id: string;
  category: string;
  imageUrl: string;
  markdown: string;
  slug: string;
  title: string;
  authorId: string;
  CreatedAt: Date;
  UpdatedAt: Date;

  author: User;
};

const prisma = new PrismaClient();

export async function createPost(
  post: Pick<
    posts,
    "category" | "imageUrl" | "markdown" | "slug" | "title" | "authorId"
  >
) {
  return prisma.posts.create({
    data: {
      ...post,
    },
    include: {
      author: true,
    },
  });
}

export async function deletePost(id: string) {
  return prisma.posts.delete({
    where: {
      id,
    },
  });
}

export async function getPosts() {
  return prisma.posts.findMany({
    orderBy: {
      CreatedAt: "desc",
    },
    include: {
      author: true,
    },
  });
}

export async function getPostsViaAuthorId(authorId: string) {
  return prisma.posts.findMany({
    where: {
      authorId,
    },
    include: {
      author: true,
    },
  });
}

export async function getPostViaSlug(slug: string) {
  return prisma.posts.findFirst({
    where: {
      slug,
    },
    include: {
      author: true,
    },
  });
}

export async function getPostViaId(id: string) {
  return prisma.posts.findFirst({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
}

export async function updatePost(
  id: string,
  data: Pick<
    posts,
    "category" | "imageUrl" | "markdown" | "slug" | "title" | "id"
  >
) {
  return prisma.posts.update({
    where: {
      id,
    },
    data,
    include: {
      author: true,
    },
  });
}
