import { HomeComponent } from "../components/HomeComponent.ts";

export class GameBoard {
  private readonly main: HTMLElement;

  constructor() {
    if (!document.querySelector("main")) {
      throw new Error("No main element found in the structure document.");
    }

    this.main = document.querySelector("main")!;
  }

  private refreshListener(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  reset() {
    this.main.innerHTML = "";
    window.removeEventListener("beforeunload", this.refreshListener);
  }

  init() {
    this.reset();
    this.main.append(HomeComponent());
  }

  start() {
    this.reset();
  }
}

export const GameBoardInstance = new GameBoard();
