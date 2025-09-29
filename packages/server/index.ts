import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import morgan from "morgan";
import type { Request, Response } from "express";
import z from "zod";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello bun");
});

const conversations = new Map<string, string>();

const chatSchema = z.object({
  prompt: z.string().trim().min(5).max(500),
  conversationId: z.string(),
});

app.post("/api/chat", async (req: Request, res: Response) => {
  const parseResult = chatSchema.safeParse(req.body);

  if (!parseResult.success) {
    const formattedError = z.treeifyError(parseResult.error);
    return res.status(400).json({ error: formattedError });
  }

  const { prompt, conversationalId } = req.body;

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
    temperature: 0.2,
    max_output_tokens: 100,
    previous_response_id: conversations.get(conversationalId) || undefined,
  });

  conversations.set(conversationalId, String(response.id));

  res.json({ message: response.output_text });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port`, PORT);
});
