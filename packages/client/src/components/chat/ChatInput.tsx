import { type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { FaArrowUp } from "react-icons/fa";
import { Button } from "../ui/button";

type ChatFormdata = {
  prompt: string;
};

type Props = {
  onSubmit: (prompt: ChatFormdata) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormdata>();

  const submit = handleSubmit((data) => {
    reset({ prompt: "" });
    onSubmit(data);
  });
  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };
  return (
    <form
      onSubmit={submit}
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
  );
};

export default ChatInput;
