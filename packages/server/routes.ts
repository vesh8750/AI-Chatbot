import express from "express";
import type { Request, Response } from "express";
import { chatController } from "./controllers/chat.controller";
import { PrismaClient } from "./generated/prisma";
import { reviewController } from "./controllers/review.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello bun");
});

router.post("/api/chat", chatController.sendMessage);

router.get("/api/products/:id/reviews", reviewController.getReviews);
router.post("/api/products/:id/reviews/summary", reviewController.summarizeReviews);

export default router;
