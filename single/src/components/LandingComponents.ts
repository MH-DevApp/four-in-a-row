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
    "flex items-center justify-center absolute top-0 left-0 h-full w-full backdrop-blur-sm backdrop-grayscale";
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
    "mx-1 md:mx-0 w-full md:w-2/3 px-6 py-12 md:px-12 md:py-24 flex flex-col justify-center items-center shadow-lg border bg-slate-50 rounded-3xl text-2xl md:text-4xl font-semibold dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700";

  container.innerHTML = message;

  if (actions.length) {
    const buttons = document.createElement("div");
    buttons.className = "flex gap-4 mt-12";
    actions.forEach((action) => {
      const button = document.createElement("button");
      button.className = `btn-custom`;
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
        document.querySelector("body")!.classList.add("overflow-hidden");
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
  const color =
    player === "Player 1"
      ? { bg: "bg-red-500", border: "border-red-700" }
      : { bg: "bg-yellow-300", border: "border-yellow-600" };

  const content = `<div class="flex justify-center items-center gap-x-4">
                    <span class="w-10 h-10 md:w-16 md:h-16 rounded-full border-8 border-double ${color.bg} ${color.border}"></span>
                    ${player}
                  </div>`;

  container.append(AlertComponent(`${content}`));
  setTimeout(() => {
    container.remove();
  }, 700);
  return container;
};

export const LandingStopGameComponent = () => {
  const container = LandingContainerComponent();
  container.append(
    AlertComponent("Are you sure you want to stop the game?", [
      { content: "Yes", cb: () => GameBoardInstance.init() },
      { content: "No", cb: () => container.remove() },
    ]),
  );
  return container;
};
