import { ColorToken } from "@/utils/TokenType";
import { blackOpsOne } from "@/utils/fonts";

const LogoComponent = () => {
  const tokens: ColorToken[] = [" ", " ", "R", "Y", "R", "Y", "R", "Y", "Y"];
  return (
    <div className="flex items-center gap-x-2 p-2">
      <div className="grid h-10 w-10 -rotate-6 grid-cols-3 grid-rows-3 gap-1 rounded bg-blue-500 p-1 shadow-xl md:h-12 md:w-12">
        {tokens.map((token, index) => (
          <TokenLogoComponent key={`${index}-${token}`} color={token} />
        ))}
      </div>
      <h1 className="brand">
        <span className={blackOpsOne.className}>4</span> in a row
      </h1>
    </div>
  );
};

export default LogoComponent;

const TokenLogoComponent = ({ color }: { color: ColorToken }) => {
  const colorClass = {
    R: "bg-red-400 dark:bg-yellow-300",
    Y: "bg-yellow-300 dark:bg-red-400",
    " ": "bg-slate-50",
  };
  return <div className={`rounded-full ${colorClass[color]}`}></div>;
};
