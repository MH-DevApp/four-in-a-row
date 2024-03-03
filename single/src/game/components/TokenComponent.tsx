import { ColorToken } from "@/game/store/useGameStore";

type TokenComponentProps = {
  colorToken: ColorToken;
};

const TokenComponent = ({ colorToken }: TokenComponentProps) => {
  if (colorToken === "R") {
    return (
      <div className="h-10 w-10 rounded-full border-8 border-double border-red-700 bg-red-500 dark:bg-red-400 md:h-16 md:w-16"></div>
    );
  } else if (colorToken === "Y") {
    return (
      <div className="h-10 w-10 rounded-full border-8 border-double border-yellow-600 bg-yellow-300 dark:bg-yellow-300 md:h-16 md:w-16"></div>
    );
  }

  return (
    <div className="h-10 w-10 rounded-full border-2 border-gray-700 bg-slate-50 md:h-16 md:w-16"></div>
  );
};

export default TokenComponent;
