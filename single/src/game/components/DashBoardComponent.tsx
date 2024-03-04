import { Player } from "@/game/store/useGameStore";
import { PropsWithChildren } from "react";

type DashBoardComponentProps = {
  currentPlayer: Player;
  score: { [key in Player]: number };
};

const DashBoardComponent = ({
  currentPlayer,
  score,
}: DashBoardComponentProps) => {
  return (
    <div className="mt-4 flex flex-col items-center gap-6 text-sm md:flex-row">
      <h4 className="text-lg font-semibold underline underline-offset-2">
        Score:
      </h4>
      {Object.keys(score).map((player) => (
        <PlayerContainerScore
          playerKey={player}
          currentPlayer={currentPlayer}
          key={player}
        >
          <span
            className={`block h-5 w-5 rounded-full border-2 ${player === "Player 1" ? "bg-red-500" : "bg-yellow-500"}`}
          ></span>
          <span>{player}</span>
          <span className="p-2 text-lg font-medium">
            {score[player as Player]}
          </span>
        </PlayerContainerScore>
      ))}
    </div>
  );
};

const PlayerContainerScore = ({
  playerKey,
  currentPlayer,
  children,
}: PropsWithChildren<{
  playerKey: string;
  currentPlayer: Player;
}>) => {
  if (playerKey === currentPlayer) {
    return (
      <p className="flex items-center gap-1 rounded-xl border-2 border-green-300 bg-green-200 p-1 font-extrabold dark:border-green-400 dark:bg-green-300 dark:text-slate-800 md:p-2">
        {children}
      </p>
    );
  }
  return (
    <p className="flex items-center gap-1 rounded-xl border-2 border-transparent p-1 md:p-2">
      {children}
    </p>
  );
};

export default DashBoardComponent;
