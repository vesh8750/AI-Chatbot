import fs from "fs";
import path from "path";
import OpenAI from "openai";
import template from "../prompts/chatbot.txt";
import { coversationRepository } from "../repositories/conversation.repository";

const parkInfo = fs.readFileSync(
  path.join(__dirname, "..", "prompts", "WonderWorld.md"),
  "utf-8"
);
const instructions = template.replace("{{parkInfo}}", parkInfo);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sendMessage = async (prompt: string, conversationId: string) => {
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    instructions,
    input: prompt,
    temperature: 0.2,
    max_output_tokens: 100,
    previous_response_id:
      coversationRepository.getLastResponseId(conversationId),
  });

  coversationRepository.setLastResponseId(conversationId, String(response.id));

  return {
    id: response.id,
    message: response.output_text,
  };
};

export const chatService = {
  sendMessage,
};
