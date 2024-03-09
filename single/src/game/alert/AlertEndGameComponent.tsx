import { useGameStore } from "@/game/store/useGameStore";
import { useRouter } from "next/navigation";

const AlertEndGameComponent = () => {
  const gameStore = useGameStore();
  const router = useRouter();
  let content = "";

  const backHome = () => {
    document.querySelector("body")?.classList.remove("overflow-hidden");
    router.replace("/");
  };

  const playAgain = () => {
    gameStore.reset();
  };

  if (!gameStore.isWinner.showAlert && !gameStore.isDraw) {
    return null;
  }

  if (gameStore.isWinner.value) {
    content = `${gameStore.currentPlayer} wins!`;
  } else if (gameStore.isDraw) {
    content = "It's a draw!";
  }

  return (
    <div className="flex flex-col items-center justify-center gap-x-4 gap-y-4">
      <span>{content}</span>
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

export default AlertEndGameComponent;
