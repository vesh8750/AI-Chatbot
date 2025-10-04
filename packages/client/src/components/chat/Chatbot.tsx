import axios from "axios";
import { useRef, useState } from "react";

import ChatInput from "./ChatInput";
import ChatMessages, { type Message } from "./ChatMessages";
import TypingIndicator from "./TypingIndicator";

type Formdata = {
  prompt: string;
};

type ChatResponse = {
  message: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const conversationId = useRef(crypto.randomUUID());

  const onSubmit = async ({ prompt }: Formdata) => {
    try {
      setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
      setError(null);
      setIsBotTyping(true);
      const { data } = await axios.post<ChatResponse>("/api/chat", {
        prompt,
        conversationId: conversationId.current,
      });

      setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);

    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
    finally{
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export default Chatbot;
