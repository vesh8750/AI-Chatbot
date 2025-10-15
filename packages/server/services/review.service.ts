import { maxLength } from "zod";
import type { Review } from "../generated/prisma";
import { llmClient } from "../llm/client";
import { reviewRepository } from "../repositories/review.repository";

const getReviews = async (productId: number): Promise<Review[]> => {
  return reviewRepository.getReviews(productId);
};

const summarizeReviews = async (productId: number): Promise<string> => {
  const reviews = await reviewRepository.getReviews(productId, 10);

  const joinedReview = reviews.map((r) => r.content).join("\n\n");

  const prompt = `
  Summarize the following customer reviews into a short paragraph highlighting key themes, both positive and negative:
  ${joinedReview}
  `;

  const response = await llmClient.generateText({
    prompt,
    maxTokens: 500,
  });

  return response.text;
};

export const reviewService = {
  getReviews,
  summarizeReviews,
};
