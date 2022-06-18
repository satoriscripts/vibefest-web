import type { comments, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { Posts } from "./post.server";

export type UserType = {
  id: string;
  username: string;
  displayName: string;
  profilePicture: string;
  CreatedAt: Date;
  UpdatedAt: Date;

  posts: Posts[];
  comments: comments[];
};

const prisma = new PrismaClient();

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: {
      CreatedAt: "desc",
    },
  });
}

export async function getUserViaId(id: string) {
  return prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      posts: true,
      comments: true,
    },
  });
}

export async function getUserViaUsername(username: string) {
  return prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      posts: true,
      comments: true,
    },
  });
}

export async function createUser(
  user: Pick<User, "id" | "username" | "displayName" | "profilePicture">
) {
  return prisma.user.create({
    data: {
      ...user,
    },
  });
}
