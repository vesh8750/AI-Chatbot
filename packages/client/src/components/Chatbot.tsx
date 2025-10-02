import { FaArrowUp } from "react-icons/fa";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useRef, useState, type KeyboardEvent } from "react";
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
  const conversationId = useRef(crypto.randomUUID());
  const { register, handleSubmit, reset, formState } = useForm<Formdata>();

  const onSubmit = async ({ prompt }: Formdata) => {
    setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
    reset();
    const { data } = await axios.post<ChatResponse>("/api/chat", {
      prompt,
      conversationId: conversationId.current,
    });

    setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);

    console.log(data);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 mb-10">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`px-2 py-1 rounded-xl ${
              msg.role === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-100 text-black self-start"
            }`}
          >
            {msg.content}
          </p>
        ))}
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
