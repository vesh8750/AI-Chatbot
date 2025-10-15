import { PrismaClient, type Review } from "../generated/prisma";

const getReviews = async (
  productId: number,
  limit?: number
): Promise<Review[]> => {
  const prisma = new PrismaClient();

  return prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
};

export const reviewRepository = { getReviews };
