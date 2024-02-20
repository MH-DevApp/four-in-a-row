import { Player } from "../gameboard/GameBoard.ts";

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
  }, 1000);
  return container;
};
