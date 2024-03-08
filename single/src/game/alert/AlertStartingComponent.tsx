import { useGameStore } from "@/game/store/useGameStore";
import { useEffect, useState } from "react";

const AlertStartingComponent = () => {
  const gameStore = useGameStore();
  const [counter, setCounter] = useState<number>(6);
  const [content, setContent] = useState("Ready ?");
  const startCounter = () => {
    setCounter((prev) => {
      if (prev === 1) {
        setContent("Go !");
        return 0;
      }
      prev = prev - 1;
      setContent(prev.toString());
      return prev;
    });
  };

  useEffect(() => {
    if (counter === 0) {
      const timeout = setTimeout(() => {
        gameStore.toggleStarting();
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if (gameStore.isStarting) {
      const timeout = setTimeout(startCounter, 1000);
      return () => clearTimeout(timeout);
    }
  }, [gameStore, counter]);

  if (!gameStore.isStarting) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-x-4">
      <span>{content}</span>
    </div>
  );
};

export default AlertStartingComponent;
