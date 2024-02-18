// import { HomeComponent } from "../components/HomeComponent.ts";
import { GameBoardComponent } from "../components/GameBoardComponent.ts";

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

  init() {
    this.reset();
    this.main.append(GameBoardComponent());
  }

  emptyGameBoard() {
    return new Array(6).fill(new Array(7).fill(" "));
  }

  start() {
    this.reset();
    this.main.append(GameBoardComponent());
  }
}

export const GameBoardInstance = new GameBoard();
