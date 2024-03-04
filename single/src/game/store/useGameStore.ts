import { create } from "zustand";

export type ColorToken = "R" | "Y" | " ";
export type Player = "Player 1" | "Player 2";

const MAX_COUNTER_PLAYING = 42;

type GameStore = {
  gridBoard: { color: ColorToken; isPointerOver: boolean }[][];
  counterPlaying: number;
  currentPlayer: Player;
  isTurn: boolean;
  handleCellSelector: (cell: number[], selected: boolean) => void;
  addToken: (row: number, column: number) => void;
  score: { [key in Player]: number };
  init: () => void;
  reset: () => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  gridBoard: Array.from({ length: 6 }, () =>
    Array.from({ length: 7 }, () => ({ color: " ", isPointerOver: false })),
  ),
  counterPlaying: 0,
  currentPlayer: "Player 1",
  score: { "Player 1": 0, "Player 2": 0 },
  cellSelector: [],
  isTurn: false,
  init: () => {
    get().reset();
    set({
      score: { "Player 1": 0, "Player 2": 0 },
    });
  },
  reset: () => {
    set({
      gridBoard: Array.from({ length: 6 }, () =>
        Array.from({ length: 7 }, () => ({ color: " ", isPointerOver: false })),
      ),
      counterPlaying: 0,
      currentPlayer: "Player 1",
      isTurn: false,
    });
  },
  handleCellSelector: (cell, value) => {
    get().gridBoard[cell[0]][cell[1]].isPointerOver = value;
    set({
      gridBoard: [...get().gridBoard],
    });
  },
  addToken: (row: number, column: number) => {
    get().gridBoard[row][column] = {
      color: get().currentPlayer === "Player 1" ? "R" : "Y",
      isPointerOver: false,
    };
    set({
      gridBoard: [...get().gridBoard],
      counterPlaying: get().counterPlaying + 1,
    });

    if (get().counterPlaying < MAX_COUNTER_PLAYING) {
      set({
        currentPlayer:
          get().currentPlayer === "Player 1" ? "Player 2" : "Player 1",
        isTurn: true,
      });
    }

    setTimeout(() => {
      set({ isTurn: false });
    }, 700);
  },
}));
