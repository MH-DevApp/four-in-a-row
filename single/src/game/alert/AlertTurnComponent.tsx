import { useGameStore } from "@/game/store/useGameStore";

const AlertTurnComponent = () => {
  const gameStore = useGameStore();

  if (!gameStore.isTurn) {
    return null;
  }

  const classToken =
    gameStore.currentPlayer === "Player 1"
      ? "bg-red-500 border-red-700"
      : "bg-yellow-300 border-yellow-600";

  return (
    <div className="flex items-center justify-center gap-x-4">
      <span
        className={`h-10 w-10 rounded-full border-8 border-double md:h-16 md:w-16 ${classToken}`}
      ></span>
      {gameStore.currentPlayer}
    </div>
  );
};

export default AlertTurnComponent;
