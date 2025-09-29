import z from "zod";
import { chatService } from "../services/chat.service";
import type { Request, Response } from "express";

const chatSchema = z.object({
  prompt: z.string().trim().min(5).max(500),
  conversationId: z.string(),
});

const sendMessage = async (req: Request, res: Response) => {
  const parseResult = chatSchema.safeParse(req.body);

  if (!parseResult.success) {
    const formattedError = z.treeifyError(parseResult.error);
    return res.status(400).json({ error: formattedError });
  }
  try {
    const { prompt, conversationalId } = req.body;

    const response = await chatService.sendMessage(prompt, conversationalId);

    res.json({ message: response.message });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
};

export const chatController = {
  sendMessage,
};
