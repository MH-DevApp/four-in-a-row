import { ColorToken, GameBoardInstance } from "../gameboard/GameBoard.ts";

const Dashboard = () => {
  const gameBoard = GameBoardInstance;
  const classCurrentPlayer =
    "flex items-center gap-1 p-2 bg-green-200 rounded-xl border-2 border-green-300";
  const classOtherPlayer =
    "flex items-center gap-1 p-2 rounded-xl border-2 border-transparent";

  return (
    "<h2 class='text-2xl font-bold underline underline-offset-4 uppercase'>" +
    "Dashboard" +
    "</h2>" +
    "<div class='flex items-center gap-6 mt-4 text-sm'>" +
    "<h4 class='text-lg underline underline-offset-2 font-semibold'>Score:</h4>" +
    "<p class='" +
    (gameBoard.currentPlayer === "Player 1"
      ? classCurrentPlayer
      : classOtherPlayer) +
    "'>" +
    "<span class='w-5 h-5 bg-red-500 block rounded-full border-2'></span>" +
    "<span class='underline underline-offset-2'>Player 1</span>:" +
    "<span class='font-medium text-lg'>" +
    gameBoard.score["Player 1"] +
    "</span>" +
    "</p>" +
    "<p class='" +
    (gameBoard.currentPlayer === "Player 2"
      ? classCurrentPlayer
      : classOtherPlayer) +
    "'>" +
    "<span class='w-5 h-5 bg-yellow-500 block rounded-full border-2'></span>" +
    "<span class='underline underline-offset-2'>Player 2</span>:" +
    "<span class='font-medium text-lg'>" +
    gameBoard.score["Player 2"] +
    "</span>" +
    "</p>" +
    "</div>"
  );
};

const Token = (colorToken: ColorToken, animate: boolean = false) => {
  if (colorToken === "R") {
    return `<div class='h-16 w-16 bg-red-500 border-8 border-double border-red-700 rounded-full ${animate ? "animate-pulse" : ""}'></div>`;
  } else if (colorToken === "Y") {
    return `<div class='h-16 w-16 bg-yellow-300 border-8 border-double border-yellow-600 rounded-full ${animate ? "animate-pulse" : ""}'></div>`;
  }

  return `<div class='h-16 w-16 bg-slate-50 border-2 border-gray-700 rounded-full'></div>`;
};

const GameBoard = () => {
  const gridBoard = GameBoardInstance.gridBoard;

  let container =
    "<div class='grid relative grid-cols-7 grid-rows-6 border border-blue-900 bg-blue-700 rounded-2xl'>";

  for (let i = gridBoard.length - 1; i >= 0; i--) {
    for (let j = 0; j < gridBoard[i].length; j++) {
      let classColumn = "border-b-transparent";
      if (i > 0) classColumn = "border-b-2 border-blue-600";
      container += `<div data-row="${i}" data-col="${j}" class="${classColumn} p-2">${Token(gridBoard[i][j])}</div>`;
    }
  }

  container += "</div>";

  return container;
};

export const GameBoardComponent = () => {
  const container = document.createElement("div");

  container.className = "flex flex-col items-center text-center p-4";
  container.innerHTML += GameBoard();
  container.innerHTML += "<hr class='w-full my-6'>";
  container.innerHTML += Dashboard();

  const cells: NodeListOf<HTMLDivElement> =
    container.querySelectorAll("[data-col]");

  const checkEmptyInColumn = (col: number) => {
    for (let i = 0; i < GameBoardInstance.gridBoard.length; i++) {
      if (GameBoardInstance.gridBoard[i][col] === " ") {
        return i;
      }
    }

    return -1;
  };

  cells.forEach((cell) => {
    const colIndex = parseInt(cell.dataset.col!);
    let cellEmpty: HTMLElement | null = null;

    cell.addEventListener("mouseenter", () => {
      const rowIndexCellEmpty = checkEmptyInColumn(colIndex);
      if (rowIndexCellEmpty !== -1) {
        cellEmpty = document.querySelector(
          `[data-row="${rowIndexCellEmpty}"][data-col="${colIndex}"]`,
        )!;
        cellEmpty.innerHTML = Token(
          GameBoardInstance.currentPlayer === "Player 1" ? "R" : "Y",
          true,
        );
        cell.classList.add("cursor-pointer");
      } else {
        cell.classList.add("cursor-no-drop");
      }
    });

    cell.addEventListener("mouseleave", () => {
      if (cellEmpty !== null) {
        cellEmpty.innerHTML = Token(" ");
      }
    });
  });

  return container;
};
