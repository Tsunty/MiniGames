import { useEffect, useState, Dispatch, SetStateAction } from "react";
import PixelColoring_game from "./PixelColoring/PixelColoring";
import { JSX } from "react";
import Decoding_game from "./Decoding/DecodingGame";

type NavigatorProps = {
  setGame: (game: JSX.Element) => void;
  StateSelectDE: [string, Dispatch<SetStateAction<string>>];
};
export function Navigator_games({
  setGame,
  StateSelectDE,
}: NavigatorProps): JSX.Element {
  const games: { number: number; component: JSX.Element }[] = [
    {
      number: 1,
      component: <PixelColoring_game isSelect={StateSelectDE[0]} />,
    },
    // { number: 2, component: <></> },
    { number: 3, component: <Decoding_game isSelect={StateSelectDE[0]} /> },
  ];
  const [selectedBTN, setSelectedBTN] = useState<number>(1);
  useEffect(() => {
    setGame(games[selectedBTN].component);
  }, [StateSelectDE[0]]);

  return (
    <div className=" w-1/12 h-4/5 flex items-center flex-col gap-3">
      {games.map((game, index) => (
        <Nav_BTN
          key={index}
          number={game.number}
          game={game.component}
          onClick={() => {
            setGame(game.component);
            setSelectedBTN(index);
          }}
          isSelected={selectedBTN === index}
        />
      ))}
    </div>
  );
}

type Nav_BTN_props = {
  number: number;
  game: JSX.Element;
  onClick: () => void;
  isSelected: boolean;
};

function Nav_BTN({ number, onClick, isSelected }: Nav_BTN_props): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={`rounded-full w-16 h-16 cursor-pointer select-none
                  flex items-center justify-center text-3xl text-white
                  transition-colors ${
                    isSelected ? "bg-green-500" : "bg-red-400"
                  }`}
    >
      {number}
    </div>
  );
}
