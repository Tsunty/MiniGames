"use client";
import { useState } from "react";
import { Navigator_games } from "../../components/Games_nav";
import { JSX } from "react";
import Demo_Edit from "../../components/DemoEdit";

export default function Home() {
  const [gameComponent, setGameComponent] = useState<JSX.Element | null>(null);
  const [isSelect, setisSelect] = useState<string>("DEMO");

  return (
    <div className="w-screen h-screen bg-amber-100 flex justify-center items-center">
      <Navigator_games setGame={setGameComponent} StateSelectDE={[isSelect, setisSelect]}/>
      <div className=" w-4/5 h-4/5">
        <Demo_Edit StateSelectDE={[isSelect, setisSelect]} />
        <GameBlock gameComponent={gameComponent}/>
      </div>
    </div>
  );
}

type GameBlock_props = {
  gameComponent: JSX.Element | null
}
function GameBlock({ gameComponent }:GameBlock_props): JSX.Element {
  return (
    <div className=" w-full h-full bg-white rounded-2xl p-4">
      {gameComponent}
    </div>
  );
}
