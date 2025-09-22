import { JSX, useState } from "react";
import Table_game_decode from "./tableDecode";
import Game_palette from "../PixelColoring/pallet";

export default function Decoding(): JSX.Element {
  const [colorPick, setcolorPick] = useState<string>("");

  return (
    <div className="w-full h-full flex">
      {/* <Game_palette setcolorPick={setcolorPick} /> */}
      {/* <Table_game_decode /> */}
    </div>
  );
}
