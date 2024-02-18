// import { HomeComponent } from "../components/HomeComponent.ts";
import { GameBoardComponent } from "../components/GameBoardComponent.ts";
import { HomeComponent } from "../components/HomeComponent.ts";

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
  }

  init() {
    this.reset();
    this.main.append(HomeComponent());
  }

  emptyGameBoard(): ColorToken[][] {
    return Array.from({ length: 6 }, () => Array(7).fill(" "));
  }

  start() {
    this.reset();
    this.main.append(GameBoardComponent());
    // window.addEventListener("beforeunload", this.refreshListener);
  }

  addTokenInGrid(rowIndex: number, colIndex: number) {
    this.gridBoard[rowIndex][colIndex] =
      this.currentPlayer === "Player 1" ? "R" : "Y";
    this.turn();
  }
}

export const GameBoardInstance = new GameBoard();
