import type { guestBookComments } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
export type { guestBookComments };

const prisma = new PrismaClient();

export async function getGuestBookComments() {
  return await prisma.guestBookComments.findMany({ include: { user: true } });
}

export async function getGuestbookCommentViaId(id: string) {
  return prisma.guestBookComments.findFirst({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
}

export async function getUserGuestbookComments(userId: string) {
  return prisma.guestBookComments.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
    orderBy: {
      CreatedAt: "desc",
    },
  });
}

export async function createGuestbookComment(
  comment: Pick<guestBookComments, "userId" | "content">
) {
  return prisma.guestBookComments.create({
    data: {
      ...comment,
    },
  });
}
