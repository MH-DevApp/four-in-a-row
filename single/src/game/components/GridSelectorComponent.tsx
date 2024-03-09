"use client";

import { useGameStore } from "@/game/store/useGameStore";
import { PointerEvent } from "react";

const GridSelectorComponent = () => {
  return (
    <div className="absolute grid h-full w-full grid-cols-7">
      {[...Array(7)].map((_, index) => (
        <ColumnSelector key={`selector-col-${index}`} index={index} />
      ))}
    </div>
  );
};

const ColumnSelector = ({ index }: { index: number }) => {
  const gameStore = useGameStore();

  let classColumn = "";
  if (index === 0) classColumn = "rounded-l-2xl";
  if (index === 6) classColumn = "rounded-r-2xl";

  const getEmptyCellInColumn = () => {
    for (let i = 0; i < gameStore.gridBoard.length; i++) {
      if (gameStore.gridBoard[i][index].color === " ") return i;
    }

    return -1;
  };

  const handleSelector = (event: PointerEvent<HTMLDivElement>) => {
    const cellEmpty = getEmptyCellInColumn();
    if (cellEmpty === -1) return;

    if (event.pointerType === "mouse") {
      gameStore.handleCellSelector(
        [cellEmpty, index],
        event.type === "pointerover",
      );
    } else {
      if (event.type === "pointerover") {
        if (gameStore.gridBoard[cellEmpty][index].isPointerOver) {
          gameStore.addToken(cellEmpty, index);
        } else {
          for (let i = 0; i < gameStore.gridBoard.length; i++) {
            for (let j = 0; j < gameStore.gridBoard[i].length; j++) {
              if (gameStore.gridBoard[i][j].isPointerOver) {
                gameStore.handleCellSelector([i, j], false);
                break;
              }
            }
          }
          gameStore.handleCellSelector([cellEmpty, index], true);
        }
      }
    }
  };

  const handleAddToken = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      const cellEmpty = getEmptyCellInColumn();
      if (cellEmpty === -1) return;
      gameStore.addToken(cellEmpty, index);
    }
  };

  return (
    <div
      onPointerOver={handleSelector}
      onPointerLeave={handleSelector}
      onPointerDown={handleAddToken}
      className={`h-full w-full ${classColumn} ${getEmptyCellInColumn() >= 0 ? "cursor-pointer" : "cursor-no-drop hover:backdrop-brightness-75"} border p-1 md:p-2`}
    ></div>
  );
};

export default GridSelectorComponent;
