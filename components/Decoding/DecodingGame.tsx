import { useState, JSX, Dispatch, SetStateAction, ReactElement } from "react";
import ImageBlock from "./imgBlock";
import CodeBlock from "./codeBlock";

export type game_prop = {
  img: string;
  labels: string[];
  secret_code: string;
};



type Decoding_game_props = {
  isSelect: string;
};
export default function Decoding_game({
  isSelect,
}: Decoding_game_props): JSX.Element {
  const localdata = localStorage.getItem("game3_props");
  const exampleData = localdata ? JSON.parse(localdata) : null;

  const [game_props, setGame_props] = useState<game_prop>({
    img: exampleData ? exampleData.img : "",
    labels: exampleData ? exampleData.labels : ["", ""],
    secret_code: exampleData ? exampleData.secret_code : "",
  });

  return (
    <div className="flex w-full h-full justify-center items-center">
      <ImageBlock isSelect={isSelect} gameProps={[game_props, setGame_props]} />
      <CodeBlock isSelect={isSelect} gameProps={[game_props, setGame_props]} />
    </div>
  );
}
