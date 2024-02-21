import { ColorToken, GameBoardInstance } from "../gameboard/GameBoard.ts";

const Dashboard = () => {
  const gameBoard = GameBoardInstance;
  const classCurrentPlayer =
    "flex items-center gap-1 p-1 md:p-2 bg-green-200 rounded-xl border-2 border-green-300 dark:bg-green-300 dark:border-green-400 dark:text-slate-800 font-extrabold";
  const classOtherPlayer =
    "flex items-center gap-1 p-1 md:p-2 rounded-xl border-2 border-transparent";

  return (
    "<div class='flex flex-col md:flex-row items-center gap-6 mt-4 text-sm'>" +
    "<h4 class='text-lg underline underline-offset-2 font-semibold'>Score:</h4>" +
    "<p class='" +
    (gameBoard.currentPlayer === "Player 1"
      ? classCurrentPlayer
      : classOtherPlayer) +
    "'>" +
    "<span class='w-5 h-5 bg-red-500 block rounded-full border-2'></span>" +
    "<span>Player 1</span>:" +
    "<span class='font-medium text-lg p-2'>" +
    gameBoard.score["Player 1"] +
    "</span>" +
    "</p>" +
    "<p class='" +
    (gameBoard.currentPlayer === "Player 2"
      ? classCurrentPlayer
      : classOtherPlayer) +
    "'>" +
    "<span class='w-5 h-5 bg-yellow-500 block rounded-full border-2'></span>" +
    "<span>Player 2</span>:" +
    "<span class='font-medium text-lg p-2'>" +
    gameBoard.score["Player 2"] +
    "</span>" +
    "</p>" +
    "</div>"
  );
};

const Token = (colorToken: ColorToken, animate: boolean = false) => {
  if (colorToken === "R") {
    return `<div class='h-10 w-10 md:h-16 md:w-16 bg-red-500 border-8 border-double border-red-700 dark:bg-red-400 rounded-full ${animate ? "animate-pulse" : ""}'></div>`;
  } else if (colorToken === "Y") {
    return `<div class='h-10 w-10 md:h-16 md:w-16 bg-yellow-300 border-8 border-double border-yellow-600 dark:bg-yellow-300 rounded-full ${animate ? "animate-pulse" : ""}'></div>`;
  }

  return `<div class='h-10 w-10 md:h-16 md:w-16 bg-slate-50 border-2 border-gray-700 rounded-full'></div>`;
};

const GameBoard = () => {
  const gridBoard = GameBoardInstance.gridBoard;

  let container =
    "<div class='grid relative grid-cols-7 grid-rows-6 border border-blue-900 bg-blue-700 rounded-2xl dark:bg-blue-500'>";

  for (let i = gridBoard.length - 1; i >= 0; i--) {
    for (let j = 0; j < gridBoard[i].length; j++) {
      let classColumn = "border-b-transparent";
      if (i > 0)
        classColumn = "border-b-2 border-blue-600 dark:border-blue-400";
      if (i === 0 && j === 0) classColumn += " rounded-bl-2xl";
      if (i === 0 && j === 6) classColumn += " rounded-br-2xl";
      if (i === 5 && j === 0) classColumn += " rounded-tl-2xl";
      if (i === 5 && j === 6) classColumn += " rounded-tr-2xl";
      container += `<div data-row="${i}" data-col="${j}" class="${classColumn} p-1 md:p-2">${Token(gridBoard[i][j])}</div>`;
    }
  }

  container +=
    "<div id='grid-selected' class='absolute grid grid-cols-7 w-full h-full'>" +
    "<div data-col='0' class='h-full w-full border rounded-l-2xl p-1 md:p-2'></div>" +
    "<div data-col='1' class='h-full w-full border p-1 md:p-2'></div>" +
    "<div data-col='2' class='h-full w-full border p-1 md:p-2'></div>" +
    "<div data-col='3' class='h-full w-full border p-1 md:p-2'></div>" +
    "<div data-col='4' class='h-full w-full border p-1 md:p-2'></div>" +
    "<div data-col='5' class='h-full w-full border p-1 md:p-2'></div>" +
    "<div data-col='6' class='h-full w-full border p-1 md:p-2 rounded-r-2xl'></div>" +
    "</div>";

  container += "</div>";

  return container;
};

export const GameBoardComponent = () => {
  const container = document.createElement("div");

  container.className = "flex flex-col items-center text-center p-4";
  container.innerHTML += GameBoard();
  container.innerHTML += "<hr class='w-full my-6'>";
  container.innerHTML += Dashboard();

  const cells: NodeListOf<HTMLDivElement> = container.querySelectorAll(
    "#grid-selected > [data-col]",
  );

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

    cell.addEventListener("pointerover", (event) => {
      const rowIndexCellEmpty = checkEmptyInColumn(colIndex);
      if (rowIndexCellEmpty !== -1) {
        if (cell.dataset.row === rowIndexCellEmpty.toString()) {
          cellEmpty = cell;
        } else {
          cellEmpty = document.querySelector(
            `[data-row="${rowIndexCellEmpty}"][data-col="${colIndex}"]`,
          )!;
        }
        if (event.pointerType === "mouse") {
          cellEmpty.innerHTML = Token(
            GameBoardInstance.currentPlayer === "Player 1" ? "R" : "Y",
            true,
          );
          cell.classList.add("cursor-pointer");
        }
      } else {
        cell.classList.add("cursor-no-drop");
      }
    });

    cell.addEventListener("mouseleave", () => {
      if (cellEmpty !== null) {
        cellEmpty.innerHTML = Token(" ");
      }
    });

    cell.addEventListener("pointerdown", (event) => {
      if (cellEmpty) {
        if (event.pointerType === "mouse") {
          GameBoardInstance.addTokenInGrid(+cellEmpty.dataset.row!, colIndex);
        } else {
          GameBoardInstance.addTokenInGrid(+cellEmpty.dataset.row!, colIndex);
        }
      }
    });
  });

  return container;
};
