import OpenAI from "openai";
import { coversationRepository } from "../repositories/conversation.repository";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sendMessage = async (prompt: string, conversationId: string) => {
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
    temperature: 0.2,
    max_output_tokens: 100,
    previous_response_id:
      coversationRepository.getLastResponseId(conversationId),
  });

  coversationRepository.setLastResponseId(
    conversationId,
    String(response.id)
  );

  return {
    id: response.id,
    message: response.output_text,
  };
};

export const chatService = {
  sendMessage,
};
