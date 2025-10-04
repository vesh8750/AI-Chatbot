import { useRef, useEffect } from "react";
import ReactMarkDown from "react-markdown";


export type Message = {
  content: string;
  role: "user" | "bot";
};

type Props = {
  messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  const onCopyMessage = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };
  return (
    <div className="flex flex-col gap-3 px-3">
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
    </div>
  );
};

export default ChatMessages;
