import Link from "next/link";

const HomeComponent = () => {
  return (
    <div className="flex flex-col items-center p-2 text-center md:p-4">
      <h2 className="my-6 text-2xl font-bold underline underline-offset-4 md:text-3xl">
        Welcome to the exciting world of &quot;4 in a row&quot;!
      </h2>
      <p className="mb-8 text-sm md:text-base">
        &quot;4 in a row&quot; is a classic and timeless strategy game that will
        put your tactical skills to the test. In this thrilling game, two
        players compete to align four tokens of their respective color in a
        vertical, horizontal, or diagonal row before their opponent.
      </p>
      <h3 className="mb-6 text-2xl font-semibold underline underline-offset-8">
        How to Play:
      </h3>
      <ul className="mb-8 flex list-decimal flex-col gap-y-6 self-start px-8 text-start md:px-12">
        <li>
          <h4 className="mb-2 w-[150px] font-medium underline underline-offset-2">
            Objective:
          </h4>
          <p className="text-start text-sm md:text-base">
            The objective of the game is simple: be the first to align four
            tokens of your color (red for player 1 and yellow for player 2) in a
            row, whether horizontally, vertically, or diagonally.
          </p>
        </li>
        <li>
          <h4 className="mb-2 w-[150px] font-medium underline underline-offset-2">
            Gameplay:
          </h4>
          <p className="text-sm md:text-base">
            Players take turns placing a token of their color into one of the
            columns of the grid. The token then drops to the bottom of the
            column until it encounters another token or the bottom of the grid.
          </p>
        </li>
        <li>
          <h4 className="mb-2 w-[150px] font-medium underline underline-offset-2">
            Strategy:
          </h4>
          <p className="text-sm md:text-base">
            Anticipate your opponent&apos;s moves and try to block their
            attempts to align while seeking to create your own winning
            alignments.
          </p>
        </li>
        <li>
          <h4 className="mb-2 w-[150px] font-medium underline underline-offset-2">
            Victory:
          </h4>
          <p className="text-sm md:text-base">
            The first player to successfully align four tokens of their color
            wins the game. If the grid is filled without any player aligning
            four tokens, the game ends in a draw.
          </p>
        </li>
      </ul>

      <h3 className="mb-6 text-xl font-semibold underline underline-offset-8 md:text-2xl">
        Ready to take on the challenge?
      </h3>
      <p className="text-sm md:text-base">
        &quot;4 in a row&quot; is easy to learn but difficult to master.
        Challenge your friends or family to see who will be the master of the
        grid!
      </p>
      <p className="mb-4 text-sm md:text-base">
        May the best strategy prevail and the best emerge victorious in this
        captivating game of wits!
      </p>
      <h3 className="md:text-lg">Good luck and have fun!</h3>

      <Link className="btn-custom mt-4 px-12 py-4 text-base" href={"/game"}>
        Start Game
      </Link>
    </div>
  );
};

export default HomeComponent;
