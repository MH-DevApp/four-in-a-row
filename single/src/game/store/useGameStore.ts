import { create } from "zustand";

export type ColorToken = "R" | "Y" | " ";
export type Player = "Player 1" | "Player 2";
export type Cell = {
  color: ColorToken;
  isPointerOver: boolean;
  isWin: boolean;
};
export type GridBoard = Cell[][];

const MAX_COUNTER_PLAYING = 42;

const emptyGridBoard = (): GridBoard =>
  Array.from({ length: 6 }, () =>
    Array.from({ length: 7 }, () => ({
      color: " ",
      isPointerOver: false,
      isWin: false,
    })),
  );

const checkIsWinner = (
  gridBoard: GridBoard,
  row: number,
  column: number,
  currenPlayer: Player,
): { row: number; col: number }[] => {
  let tokensWin: { row: number; col: number }[] = [];
  let count = 0;
  let colorToken: ColorToken = currenPlayer === "Player 1" ? "R" : "Y";
  let x = row;
  let y = column;

  const reset = () => {
    count = 0;
    tokensWin = [];
    y = column;
    x = row;
  };

  const sortResult = (
    isRow: boolean = true,
  ): { row: number; col: number }[] => {
    if (isRow) {
      return tokensWin.sort((a, b) => a.row - b.row);
    }

    return tokensWin.sort((a, b) => a.col - b.col);
  };

  // Check horizontal
  while (count < 4 && y >= 0 && gridBoard[x][y].color === colorToken) {
    tokensWin.push({ row: x, col: y });
    count++;
    y--;
  }

  y = column + 1;

  while (count < 4 && y < 7 && gridBoard[x][y].color === colorToken) {
    tokensWin.push({ row: x, col: y });
    count++;
    y++;
  }

  if (count === 4) {
    return sortResult(false);
  }

  reset();

  // Check vertical
  while (count < 4 && x >= 0 && gridBoard[x][y].color === colorToken) {
    tokensWin.push({ row: x, col: y });
    count++;
    x--;
  }

  if (count === 4) {
    return sortResult();
  }

  reset();

  // diagonal top left to bottom right

  while (count < 4 && x >= 0 && y < 7 && gridBoard[x][y].color === colorToken) {
    tokensWin.push({ row: x, col: y });
    count++;
    x--;
    y++;
  }

  x = row + 1;
  y = column - 1;

  while (count < 4 && x < 6 && y >= 0 && gridBoard[x][y].color === colorToken) {
    tokensWin.push({ row: x, col: y });
    count++;
    x++;
    y--;
  }

  if (count === 4) {
    return sortResult();
  }

  reset();

  // diagonal top right to bottom left

  while (
    count < 4 &&
    x >= 0 &&
    y >= 0 &&
    gridBoard[x][y].color === colorToken
  ) {
    tokensWin.push({ row: x, col: y });
    count++;
    x--;
    y--;
  }

  x = row + 1;
  y = column + 1;

  while (count < 4 && x < 6 && y < 7 && gridBoard[x][y].color === colorToken) {
    tokensWin.push({ row: x, col: y });
    count++;
    x++;
    y++;
  }

  if (count === 4) {
    return sortResult();
  }

  return [];
};

type GameStore = {
  gridBoard: GridBoard;
  counterPlaying: number;
  currentPlayer: Player;
  isTurn: boolean;
  isStarting: boolean;
  isWinner: { value: boolean; showAlert: boolean };
  isDraw: boolean;
  toggleStarting: () => void;
  handleCellSelector: (cell: number[], selected: boolean) => void;
  addToken: (row: number, column: number) => void;
  score: { [key in Player]: number };
  init: () => void;
  reset: () => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  gridBoard: emptyGridBoard(),
  counterPlaying: 0,
  currentPlayer: "Player 1",
  score: { "Player 1": 0, "Player 2": 0 },
  cellSelector: [],
  isTurn: false,
  isStarting: false,
  isWinner: { value: false, showAlert: false },
  isDraw: false,
  toggleStarting: () => {
    set({ isStarting: false });
  },
  init: () => {
    get().reset();
    set({
      score: { "Player 1": 0, "Player 2": 0 },
    });
  },
  reset: () => {
    set({
      gridBoard: emptyGridBoard(),
      counterPlaying: 0,
      currentPlayer: "Player 1",
      isTurn: false,
      isStarting: true,
      isWinner: { value: false, showAlert: false },
      isDraw: false,
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
      ...get().gridBoard[row][column],
      color: get().currentPlayer === "Player 1" ? "R" : "Y",
      isPointerOver: false,
    };
    set({
      gridBoard: [...get().gridBoard],
      counterPlaying: get().counterPlaying + 1,
    });

    const tokensWin = checkIsWinner(
      get().gridBoard,
      row,
      column,
      get().currentPlayer,
    );

    if (tokensWin.length > 0) {
      set({
        isWinner: { value: true, showAlert: false },
      });

      let counter = 0;
      const setTokenWin = () => {
        get().gridBoard[tokensWin[counter].row][tokensWin[counter].col] = {
          ...get().gridBoard[tokensWin[counter].row][tokensWin[counter].col],
          isWin: true,
        };
        set({
          gridBoard: [...get().gridBoard],
        });
        counter++;

        if (counter === 4) {
          setTimeout(() => {
            set({
              isWinner: { value: true, showAlert: true },
              score: {
                ...get().score,
                [get().currentPlayer]: get().score[get().currentPlayer] + 1,
              },
            });
          }, 2000);
          return;
        }
        setTimeout(setTokenWin, 350);
      };

      setTokenWin();
      return;
    }

    if (tokensWin.length === 0 && get().counterPlaying < MAX_COUNTER_PLAYING) {
      set({
        currentPlayer:
          get().currentPlayer === "Player 1" ? "Player 2" : "Player 1",
        isTurn: true,
      });

      setTimeout(() => {
        set({ isTurn: false });
      }, 0);
      return;
    }

    if (get().counterPlaying === MAX_COUNTER_PLAYING) {
      set({
        isDraw: true,
      });
    }
  },
}));
