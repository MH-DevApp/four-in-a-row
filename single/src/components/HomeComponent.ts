import { GameBoardInstance } from "../gameboard/GameBoard.ts";

export const HomeComponent = () => {
  const container = document.createElement("div");
  container.className = "flex flex-col items-center text-center p-2 md:p-4";

  container.innerHTML +=
    "<h2 class='text-2xl md:text-3xl font-bold underline underline-offset-4 my-6'>Welcome to the exciting world of \"4 in a row\"!</h2>";
  container.innerHTML +=
    "<p class='mb-8 text-sm md:text-base'>\"4 in a row\" is a classic and timeless strategy game that will put your tactical skills to the test. In this thrilling game, two players compete to align four tokens of their respective color in a vertical, horizontal, or diagonal row before their opponent.</p>";
  container.innerHTML +=
    "<h3 class='text-2xl font-semibold mb-6 underline underline-offset-8'>How to Play:</h3>";

  container.innerHTML +=
    "<ul class='flex flex-col gap-y-6 px-8 md:px-12 list-decimal self-start text-start mb-8'>" +
    "<li>" +
    "<h4 class='w-[150px] font-medium underline underline-offset-2 mb-2'>Objective:</h4>" +
    "<p class='text-start text-sm md:text-base'>The objective of the game is simple: be the first to align four tokens of your color (red for player 1 and yellow for player 2) in a row, whether horizontally, vertically, or diagonally.</p>" +
    "</li>" +
    "<li>" +
    "<h4 class='w-[150px] font-medium underline underline-offset-2 mb-2'>Gameplay:</h4>" +
    "<p class='text-sm md:text-base'>Players take turns placing a token of their color into one of the columns of the grid. The token then drops to the bottom of the column until it encounters another token or the bottom of the grid.</p>" +
    "</li>" +
    "<li>" +
    "<h4 class='w-[150px] font-medium underline underline-offset-2 mb-2'>Strategy:</h4>" +
    "<p class='text-sm md:text-base'>Anticipate your opponent's moves and try to block their attempts to align while seeking to create your own winning alignments.</p>" +
    "</li>" +
    "<li>" +
    "<h4 class='w-[150px] font-medium underline underline-offset-2 mb-2'>Victory:</h4>" +
    "<p class='text-sm md:text-base'>The first player to successfully align four tokens of their color wins the game. If the grid is filled without any player aligning four tokens, the game ends in a draw.</p>" +
    "</li>" +
    "</ul>";

  container.innerHTML +=
    "<h3 class='text-xl md:text-2xl mb-6 font-semibold underline underline-offset-8'>Ready to take on the challenge?</h3>";
  container.innerHTML +=
    "<p class='text-sm md:text-base'>\"4 in a row\" is easy to learn but difficult to master. Challenge your friends or family to see who will be the master of the grid!</p>";
  container.innerHTML +=
    "<p class='mb-4 text-sm md:text-base'>May the best strategy prevail and the best emerge victorious in this captivating game of wits!</p>";
  container.innerHTML += "<h3 class='md:text-lg'>Good luck and have fun!</h3>";

  const buttonStart = document.createElement("button");
  buttonStart.className =
    "btn-custom mt-4 text-base px-12 py-4";
  buttonStart.innerText = "Start Game";

  buttonStart.addEventListener("click", () => {
    GameBoardInstance.start();
  });

  container.append(buttonStart);

  return container;
};
