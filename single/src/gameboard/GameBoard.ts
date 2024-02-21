import { HomeComponent } from "../components/HomeComponent.ts";
import { GameBoardComponent } from "../components/GameBoardComponent.ts";
import {
  LandingStartComponent,
  LandingTurnComponent,
  LandingEndGameComponent,
} from "../components/LandingComponents.ts";

export type ColorToken = "R" | "Y" | " ";
export type Player = "Player 1" | "Player 2";

export class GameBoard {
  private readonly main: HTMLElement;
  gridBoard: ColorToken[][];
  currentPlayer: Player;
  score: { [key: string]: number };

  constructor() {
    if (!document.querySelector("main")) {
      throw new Error("No main element found in the structure document.");
    }

    this.gridBoard = this.emptyGameBoard();
    this.currentPlayer = "Player 1";
    this.score = { "Player 1": 0, "Player 2": 0 };
    this.main = document.querySelector("main")!;
  }

  private refreshListener(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  reset() {
    this.main.innerHTML = "";
    this.gridBoard = this.emptyGameBoard();
    window.removeEventListener("beforeunload", this.refreshListener);
  }

  turn() {
    this.currentPlayer =
      this.currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    this.main.innerHTML = "";
    this.main.append(GameBoardComponent());
    this.main.append(LandingTurnComponent(this.currentPlayer));
  }

  init() {
    document.querySelector("body")!.classList.remove("overflow-hidden");
    this.reset();
    this.score = { "Player 1": 0, "Player 2": 0 };
    this.main.append(HomeComponent());
  }

  emptyGameBoard(): ColorToken[][] {
    return Array.from({ length: 6 }, () => Array(7).fill(" "));
  }

  start() {
    document.querySelector("body")!.classList.remove("overflow-hidden");
    this.reset();
    this.currentPlayer = "Player 1";
    this.main.append(GameBoardComponent());
    this.main.append(LandingStartComponent());
    window.addEventListener("beforeunload", this.refreshListener);
  }

  addTokenInGrid(rowIndex: number, colIndex: number) {
    this.gridBoard[rowIndex][colIndex] =
      this.currentPlayer === "Player 1" ? "R" : "Y";
    const checkTokens = this.checkTokens(rowIndex, colIndex);
    if (checkTokens.length) {
      this.main.innerHTML = "";
      this.main.append(GameBoardComponent());
      this.score[this.currentPlayer]++;
      this.main.append(
        LandingEndGameComponent(this.currentPlayer, checkTokens),
      );
      return;
    }

    if (this.isDraw()) {
      this.main.innerHTML = "";
      this.main.append(GameBoardComponent());
      this.main.append(LandingEndGameComponent("DRAW", checkTokens));
      return;
    }

    this.turn();
  }

  private isDraw(): boolean {
    return this.gridBoard.every((row) => row.every((cell) => cell !== " "));
  }

  private checkTokens(
    rowIndex: number,
    colIndex: number,
  ): { row: number; col: number }[] {
    let tokensPosition: { row: number; col: number }[] = [];
    let count = 0;
    let colorToken: ColorToken = this.currentPlayer === "Player 1" ? "R" : "Y";
    let x = rowIndex;
    let y = colIndex;

    const reset = () => {
      count = 0;
      tokensPosition = [];
      y = colIndex;
      x = rowIndex;
    };

    // horizontal
    while (count < 4 && y >= 0 && this.gridBoard[x][y] === colorToken) {
      tokensPosition.push({ row: x, col: y });
      count++;
      y--;
    }

    y = colIndex + 1;

    while (count < 4 && y <= 6 && this.gridBoard[x][y] === colorToken) {
      tokensPosition.push({ row: x, col: y });
      count++;
      y++;
    }

    if (count === 4) {
      return tokensPosition.sort((a, b) => a.col - b.col);
    }

    reset();

    // vertical
    while (
      count < 4 &&
      x >= 0 &&
      rowIndex >= 3 &&
      this.gridBoard[x][y] === colorToken
    ) {
      tokensPosition.push({ row: x, col: y });
      count++;
      x--;
    }

    if (count === 4) {
      return tokensPosition.sort((a, b) => a.row - b.row);
    }

    reset();

    // diagonal top left to bottom right
    while (
      count < 4 &&
      x >= 0 &&
      y <= 6 &&
      this.gridBoard[x][y] === colorToken
    ) {
      tokensPosition.push({ row: x, col: y });
      count++;
      x--;
      y++;
    }

    x = rowIndex + 1;
    y = colIndex - 1;

    while (
      count < 4 &&
      x <= 5 &&
      y >= 0 &&
      this.gridBoard[x][y] === colorToken
    ) {
      tokensPosition.push({ row: x, col: y });
      count++;
      x++;
      y--;
    }

    if (count === 4) {
      return tokensPosition.sort((a, b) => a.row - b.row);
    }

    reset();

    // diagonal top right to bottom left
    while (
      count < 4 &&
      x >= 0 &&
      y >= 0 &&
      this.gridBoard[x][y] === colorToken
    ) {
      tokensPosition.push({ row: x, col: y });
      count++;
      x--;
      y--;
    }

    x = rowIndex + 1;
    y = colIndex + 1;

    while (
      count < 4 &&
      x <= 5 &&
      y <= 6 &&
      this.gridBoard[x][y] === colorToken
    ) {
      tokensPosition.push({ row: x, col: y });
      count++;
      x++;
      y++;
    }

    if (count === 4) {
      return tokensPosition.sort((a, b) => a.row - b.row);
    }

    reset();

    return tokensPosition;
  }
}

export const GameBoardInstance = new GameBoard();
