import { ColorToken, useGameStore } from "@/game/store/useGameStore";

type TokenComponentProps = {
  cell: number[];
  colorToken: ColorToken;
};

const TokenComponent = ({ cell, colorToken }: TokenComponentProps) => {
  const gameStore = useGameStore();
  let animate = false;

  if (gameStore.gridBoard[cell[0]][cell[1]].isPointerOver) {
    colorToken = gameStore.currentPlayer === "Player 1" ? "R" : "Y";
    animate = true;
  }

  if (colorToken === "R") {
    return (
      <div
        className={`h-10 w-10 rounded-full border-8 border-double border-red-700 bg-red-500 dark:bg-red-400 md:h-16 md:w-16 ${animate ? "animate-pulse" : ""}`}
      ></div>
    );
  } else if (colorToken === "Y") {
    return (
      <div
        className={`h-10 w-10 rounded-full border-8 border-double border-yellow-600 bg-yellow-300 dark:bg-yellow-300 md:h-16 md:w-16 ${animate ? "animate-pulse" : ""}`}
      ></div>
    );
  }

  return (
    <div className="h-10 w-10 rounded-full border-2 border-gray-700 bg-blue-50 dark:bg-slate-50 md:h-16 md:w-16"></div>
  );
};

export default TokenComponent;
