import fs from "fs";
import path from "path";
import OpenAI from "openai";
import template from "../prompts/chatbot.txt";
import { coversationRepository } from "../repositories/conversation.repository";
import { llmClient } from "../llm/client";

const parkInfo = fs.readFileSync(
  path.join(__dirname, "..", "prompts", "WonderWorld.md"),
  "utf-8"
);
const instructions = template.replace("{{parkInfo}}", parkInfo);

const sendMessage = async (prompt: string, conversationId: string) => {
  const response = await llmClient.generateText({
    instructions,
    prompt,
    temperature: 0.2,
    maxTokens: 100,
    previousResponseId: coversationRepository.getLastResponseId(conversationId) ?? undefined,
  });

  coversationRepository.setLastResponseId(conversationId, String(response.id));

  return {
    id: response.id,
    message: response.text,
  };
};

export const chatService = {
  sendMessage,
};
