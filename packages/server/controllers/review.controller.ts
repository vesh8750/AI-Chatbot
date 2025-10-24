import type { Request, Response } from "express";
import { reviewService } from "../services/review.service";
import { reviewRepository } from "../repositories/review.repository";
import { productRepository } from "../repositories/product.repository";

const getReviews = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const product = await productRepository.getProduct(productId);

    if (!product) {
      return res.status(400).json({ error: "Product does not exist" });
    }

    const reviews = await reviewService.getReviews(productId);
    const summary = await reviewRepository.getReviewSummary(productId);

    return res.json({ reviews, summary });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const summarizeReviews = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const product = await productRepository.getProduct(productId);

    if (!product) {
      return res.status(400).json({ error: "Invalid Product" });
    }

    const reviews = await reviewRepository.getReviews(productId, 1);

    if (!reviews.length) {
      return res
        .status(400)
        .json({ error: "There are no reviews to summarize." });
    }

    const summary = await reviewService.summarizeReviews(productId);

    return res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const reviewController = {
  getReviews,
  summarizeReviews,
};
