"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/game/store/useGameStore";

const ButtonStartComponent = () => {
  const router = useRouter();
  const gameStore = useGameStore((state) => ({
    init: state.init,
  }));

  const handleClick = () => {
    gameStore.init();
    router.push("/game");
  };

  return (
    <button
      onClick={handleClick}
      className="btn-custom mt-4 px-12 py-4 text-base"
    >
      Start Game
    </button>
  );
};

export default ButtonStartComponent;
