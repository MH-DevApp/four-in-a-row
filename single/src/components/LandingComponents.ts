import { GameBoardInstance, Player } from "../gameboard/GameBoard.ts";

const createConfetti = (container: HTMLDivElement) => {
  const colors = {
    bg: [
      "bg-red-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
    ],
    shadow: [
      "shadow-red-400",
      "shadow-yellow-400",
      "shadow-blue-400",
      "shadow-green-400",
      "shadow-purple-400",
    ],
  };

  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      const confetti = document.createElement("div");
      const randomBgColor =
        colors.bg[Math.floor(Math.random() * colors.bg.length)];
      const randomShadowColor =
        colors.shadow[Math.floor(Math.random() * colors.shadow.length)];
      const randomDuration = Math.random() * 3 + 3;

      confetti.classList.add(
        "confetti",
        "absolute",
        "w-2",
        "h-2",
        "rounded-full",
        "-z-10",
        "shadow-lg",
        randomBgColor,
        randomShadowColor,
      );
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.animationDuration = randomDuration + "s";
      container.append(confetti);

      setTimeout(() => {
        confetti.remove();
      }, randomDuration * 1000);
    }
    createConfetti(container);
  }, 1000);
};

export const LandingContainerComponent = () => {
  const container = document.createElement("div");
  container.className =
    "flex items-center justify-center absolute top-0 left-0 min-h-full w-full backdrop-blur-sm backdrop-grayscale";
  return container;
};

export const AlertComponent = (
  message: string,
  actions: {
    content: string;
    cb: () => void;
  }[] = [],
) => {
  const container = document.createElement("div");
  container.className =
    "w-2/3 px-12 py-24 flex flex-col justify-center items-center shadow-lg border bg-slate-50 rounded-3xl text-4xl font-semibold";

  container.innerHTML = message;

  if (actions.length) {
    const buttons = document.createElement("div");
    buttons.className = "flex gap-4 mt-12";
    actions.forEach((action) => {
      const button = document.createElement("button");
      button.className = `bg-red-600 hover:bg-yellow-600 active:bg-yellow-700 text-slate-50 px-4 py-2 text-sm rounded-full transition-colors`;
      button.innerText = action.content;
      button.addEventListener("click", action.cb);
      buttons.append(button);
    });
    container.append(buttons);
  }

  return container;
};

export const LandingStartComponent = () => {
  const container = LandingContainerComponent();
  container.append(AlertComponent("Ready !"));

  let counter = 3;

  const debounce = () => {
    if (counter > 0) {
      container.innerHTML = "";
      container.append(AlertComponent(`${counter}`));
      counter--;
      setTimeout(() => {
        debounce();
      }, 1000);
    } else {
      container.innerHTML = "";
      container.append(AlertComponent("Go!"));
      setTimeout(() => {
        container.remove();
      }, 1500);
    }
  };

  setTimeout(() => {
    debounce();
  }, 1500);

  return container;
};

export const LandingEndGameComponent = (
  winner: Player | "DRAW",
  positionsToken: { row: number; col: number }[],
) => {
  const container = LandingContainerComponent();
  container.classList.remove("backdrop-blur-sm", "backdrop-grayscale");
  let index = 0;

  const animation = () => {
    if (index < positionsToken.length && winner !== "DRAW") {
      const { row, col } = positionsToken[index];
      const token = document.querySelector(
        `[data-row='${row}'][data-col='${col}']`,
      )!;

      token.classList.add("bg-green-500", "animate-pulse");

      setTimeout(() => {
        index++;
        animation();
      }, 350);
    } else {
      let timingAnimation = 0;
      let message = winner;
      if (winner !== "DRAW") {
        createConfetti(container);
        timingAnimation = 1500;
        message += " wins!";
      }
      setTimeout(() => {
        container.classList.add(
          "backdrop-blur-sm",
          "backdrop-grayscale",
          "transition-all",
          "duration-1000",
        );
        container.append(
          AlertComponent(message, [
            { content: "Back to home", cb: () => GameBoardInstance.init() },
            { content: "Play Again !", cb: () => GameBoardInstance.start() },
          ]),
        );
      }, timingAnimation);
    }
  };

  animation();

  return container;
};

export const LandingTurnComponent = (player: Player) => {
  const container = LandingContainerComponent();
  const color = player === "Player 1" ? "red" : "yellow";

  const content = `<div class="flex justify-center items-center gap-x-4">
                    <span class="w-16 h-16 rounded-full border-8 border-double bg-${color}-500 border-${color}-600"></span>
                    ${player}
                  </div>`;

  container.append(AlertComponent(`${content}`));
  setTimeout(() => {
    container.remove();
  }, 700);
  return container;
};
