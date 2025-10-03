import { FaArrowUp } from "react-icons/fa";
import { Button } from "./ui/button";
import ReactMarkDown from "react-markdown";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import axios from "axios";

type Formdata = {
  prompt: string;
};

type ChatResponse = {
  message: string;
};

type Message = {
  content: string;
  role: "user" | "bot";
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const conversationId = useRef(crypto.randomUUID());
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset, formState } = useForm<Formdata>();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  const onSubmit = async ({ prompt }: Formdata) => {
    setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
    setIsBotTyping(true);
    reset({ prompt: "" });
    const { data } = await axios.post<ChatResponse>("/api/chat", {
      prompt,
      conversationId: conversationId.current,
    });

    setIsBotTyping(false);
    setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);

    console.log(data);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onCopyMessage = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            onCopy={onCopyMessage}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`px-2 py-1 rounded-xl ${
              msg.role === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-100 text-black self-start"
            }`}
          >
            <ReactMarkDown>{msg.content}</ReactMarkDown>
          </div>
        ))}
        {isBotTyping && (
          <div className="flex gap-1 bg-gray-200 p-3 rounded-xl self-start">
            <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse [animation-delay:0.3s]"></div>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-4 items-end border-2 p-4 rounded-3xl"
      >
        <textarea
          {...register("prompt", {
            required: "Please enter a prompt",
            validate: (value) => value.trim().length > 0,
          })}
          autoFocus
          className="w-full border-0 focus:outline-0 resize-none"
          placeholder="Ask anything"
          maxLength={1000}
        />
        <Button
          disabled={!formState.isValid}
          className="rounded-full h-9 w-9  flex items-center justify-center cursor-pointer"
        >
          <FaArrowUp />
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
