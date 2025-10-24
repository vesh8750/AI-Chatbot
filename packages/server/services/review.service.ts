import { maxLength } from "zod";
import type { Review } from "../generated/prisma";
import { llmClient } from "../llm/client";
import { reviewRepository } from "../repositories/review.repository";
import template from "../prompts/summarize-prompt.txt";

const getReviews = async (productId: number): Promise<Review[]> => {
  return reviewRepository.getReviews(productId);
};

const summarizeReviews = async (productId: number): Promise<string> => {
  const existingSummary = await reviewRepository.getReviewSummary(productId);

  if (existingSummary && existingSummary.expiredAt > new Date()) {
    return existingSummary.content;
  }

  const reviews = await reviewRepository.getReviews(productId, 10);

  const joinedReview = reviews.map((r) => r.content).join("\n\n");

  const prompt = template.replace("{{reviews}}", joinedReview);

  const response = await llmClient.generateText({
    prompt,
    maxTokens: 500,
  });

  const summary = response.text;

  await reviewRepository.storeReviewSummary(productId, summary);

  return summary;
};

export const reviewService = {
  getReviews,
  summarizeReviews,
};
