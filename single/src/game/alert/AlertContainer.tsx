import { useGameStore } from "@/game/store/useGameStore";
import AlertTurnComponent from "@/game/alert/AlertTurnComponent";

const AlertContainer = () => {
  const gameStore = useGameStore();

  if (!gameStore.isTurn) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center backdrop-blur-sm backdrop-grayscale">
      <div className="mx-1 flex w-full flex-col items-center justify-center rounded-3xl border bg-slate-50 px-6 py-12 text-2xl font-semibold shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 md:mx-0 md:w-2/3 md:px-12 md:py-24 md:text-4xl">
        <AlertTurnComponent />
      </div>
    </div>
  );
};

export default AlertContainer;
