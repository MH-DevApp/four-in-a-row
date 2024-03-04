"use client";

import { useGameStore } from "@/game/store/useGameStore";
import GridContainerComponent from "@/game/components/GridContainerComponent";
import DashBoardComponent from "@/game/components/DashBoardComponent";
import { useRouter } from "next/navigation";
import GridSelectorComponent from "@/game/components/GridSelectorComponent";

const GameBoardComponent = () => {
  const gameStore = useGameStore();
  const router = useRouter();

  return (
    <>
      <div className="relative grid grid-cols-7 grid-rows-6 rounded-2xl border border-blue-900 bg-blue-700 dark:bg-blue-500">
        {gameStore.gridBoard
          .map((row, rowIndex) => (
            <GridContainerComponent
              row={row}
              rowIndex={rowIndex}
              key={rowIndex}
            />
          ))
          .reverse()}
        <GridSelectorComponent />
      </div>
      <hr className="my-6 w-full" />
      <DashBoardComponent
        currentPlayer={gameStore.currentPlayer}
        score={gameStore.score}
      />
      <button
        onClick={() => router.replace("/")}
        className="btn-custom mt-8 md:text-base"
      >
        Stop game
      </button>
    </>
  );
};

export default GameBoardComponent;
