import { create } from "zustand";

export type ColorToken = "R" | "Y" | " ";
export type Player = "Player 1" | "Player 2";

const MAX_COUNTER_PLAYING = 42;

type GameStore = {
  gridBoard: ColorToken[][];
  counterPlaying: number;
  currentPlayer: Player;
  score: { [key in Player]: number };
  init: () => void;
  reset: () => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  gridBoard: Array.from({ length: 6 }, () => Array(7).fill(" ")),
  counterPlaying: 0,
  currentPlayer: "Player 1",
  score: { "Player 1": 0, "Player 2": 0 },
  init: () => {
    get().reset();
    set({
      score: { "Player 1": 0, "Player 2": 0 },
    });
  },
  reset: () => {
    set({
      gridBoard: Array.from({ length: 6 }, () => Array(7).fill(" ")),
      counterPlaying: 0,
      currentPlayer: "Player 1",
    });
  },
}));
