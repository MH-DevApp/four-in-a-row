import { type ColorToken } from "@/game/store/useGameStore";
import TokenComponent from "@/game/components/TokenComponent";

type GridContainerComponentProps = {
  row: ColorToken[];
  rowIndex: number;
};

const getClassColumn = (rowIndex: number, colIndex: number) => {
  let classColumn = "border-b-transparent";
  if (rowIndex < 5) {
    classColumn = "border-b-2 border-blue-600 dark:border-blue-400";
  }

  classColumn += " p-1 md:p-2";

  return classColumn;
};

const GridContainerComponent = ({
  row,
  rowIndex,
}: GridContainerComponentProps) => {
  return row.reverse().map((value, colIndex) => (
    <div
      key={`${value}-${rowIndex}-${colIndex}`}
      className={getClassColumn(rowIndex, colIndex)}
    >
      <TokenComponent colorToken={value} />
    </div>
  ));
};

export default GridContainerComponent;
