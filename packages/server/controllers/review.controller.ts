import type { Request, Response } from "express";
import { reviewService } from "../services/review.service";
import { reviewRepository } from "../repositories/review.repository";

const getReviews = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const reviews = await reviewService.getReviews(productId);

    return res.json(reviews);
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
