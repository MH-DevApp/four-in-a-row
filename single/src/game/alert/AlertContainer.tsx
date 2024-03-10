import { useGameStore } from "@/game/store/useGameStore";
import AlertTurnComponent from "@/game/alert/AlertTurnComponent";
import AlertStartingComponent from "@/game/alert/AlertStartingComponent";
import AlertEndGameComponent from "@/game/alert/AlertEndGameComponent";
import ConfettisComponent from "@/game/components/ConfettisComponent";
import { useEffect } from "react";

const AlertContainer = () => {
  const gameStore = useGameStore();

  useEffect(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");
    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  }, []);

  if (
    !gameStore.isTurn &&
    !gameStore.isStarting &&
    !gameStore.isWinner.value &&
    !gameStore.isDraw
  ) {
    return null;
  }

  if (gameStore.isWinner.value && !gameStore.isWinner.showAlert) {
    return (
      <div className="absolute left-0 top-0 flex h-[100svh] w-full items-center justify-center"></div>
    );
  }

  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-slate-800/40 backdrop-blur-sm transition-all duration-1000 dark:backdrop-grayscale">
      <div className="mx-1 flex w-full flex-col items-center justify-center rounded-3xl border bg-blue-50 px-6 py-12 text-2xl font-semibold shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 md:mx-0 md:w-2/3 md:px-12 md:py-24 md:text-4xl">
        {gameStore.isTurn && <AlertTurnComponent />}
        {gameStore.isStarting && <AlertStartingComponent />}
        {(gameStore.isWinner.showAlert || gameStore.isDraw) && (
          <AlertEndGameComponent />
        )}
      </div>
      {(gameStore.isWinner.showAlert || gameStore.isDraw) && (
        <ConfettisComponent />
      )}
    </div>
  );
};

export default AlertContainer;
