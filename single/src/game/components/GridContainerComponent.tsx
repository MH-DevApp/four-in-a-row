"use client";

import { type ColorToken } from "@/game/store/useGameStore";
import TokenComponent from "@/game/components/TokenComponent";

type GridContainerComponentProps = {
  row: { color: ColorToken; isPointerOver: boolean }[];
  rowIndex: number;
};

const getClassColumn = (rowIndex: number) => {
  let classColumn = "border-b-transparent";
  if (rowIndex > 0) {
    classColumn = "border-b-2 border-blue-600 dark:border-blue-400";
  }

  classColumn += " p-1 md:p-2";

  return classColumn;
};

const GridContainerComponent = ({
  row,
  rowIndex,
}: GridContainerComponentProps) => {
  return row.map((value, colIndex) => (
    <div
      key={`${value}-${rowIndex}-${colIndex}`}
      className={getClassColumn(rowIndex)}
    >
      <TokenComponent cell={[rowIndex, colIndex]} colorToken={value.color} />
    </div>
  ));
};

export default GridContainerComponent;
