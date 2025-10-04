const TypingIndicator = () => {
  return (
    <div className="flex gap-1 bg-gray-200 p-3 rounded-xl self-start">
      <Dot />
      <Dot className="[animation-delay:0.2s]" />
      <Dot className="[animation-delay:0.3s]" />
    </div>
  );
};

type DotProps = {
  className?: string;
};

const Dot = ({ className }: DotProps) => {
  return (
    <div
      className={`w-2 h-2 rounded-full bg-gray-700 animate-pulse ${className}`}
    ></div>
  );
};

export default TypingIndicator;
