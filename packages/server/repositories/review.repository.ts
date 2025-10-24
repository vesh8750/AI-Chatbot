import dayjs from "dayjs";
import { PrismaClient, type Review } from "../generated/prisma";

const prisma = new PrismaClient();

const getReviews = async (
  productId: number,
  limit?: number
): Promise<Review[]> => {
  return prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
};

const storeReviewSummary = async (productId: number, summary: string) => {
  const now = new Date();
  const expiredAt = dayjs().add(7, "days").toDate();

  const data = {
    content: summary,
    productId,
    generatedAt: now,
    expiredAt,
  };

  return prisma.summary.upsert({
    where: { productId },
    create: data,
    update: data,
  });
};

const getReviewSummary = async (productId: number): Promise<string | null> => {
  const summary = await prisma.summary.findFirst({
    where: {
      AND: [
        { productId },
        {
          expiredAt: {
            gt: new Date(),
          },
        },
      ],
    },
  });

  return summary ? summary.content : null;
};

export const reviewRepository = {
  getReviews,
  storeReviewSummary,
  getReviewSummary,
};
