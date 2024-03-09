import { useGameStore } from "@/game/store/useGameStore";
import { useRouter } from "next/navigation";

const AlertWinnerComponent = () => {
  const gameStore = useGameStore();
  const router = useRouter();

  const backHome = () => {
    document.querySelector("body")?.classList.remove("overflow-hidden");
    router.replace("/");
  };

  const playAgain = () => {
    gameStore.reset();
  };

  if (!gameStore.isWinner.showAlert) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-x-4 gap-y-4">
      <span>{gameStore.currentPlayer} wins!</span>
      <div className="flex gap-x-4">
        <button onClick={backHome} className={"btn-custom"}>
          Stop game
        </button>
        <button onClick={playAgain} className={"btn-custom"}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default AlertWinnerComponent;
