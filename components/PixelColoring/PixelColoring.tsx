"use client";
import { useState, JSX } from "react";
import Table_game_coloring from "./tableColoring";
import Game_palette from "./palletColoring";
///////////////////////////////////////////////////////////////

type PixelColoring_props = {
  isSelect: string;
};
export default function PixelColoring_game({
  isSelect,
}: PixelColoring_props): JSX.Element {
  return (
    <div className="flex flex-col gap-10 w-full h-full justify-center items-center">
      {isSelect == "DEMO" ? <Demo_game /> : <Edit_game />}
    </div>
  );
}

//////////////////////////// TABLE DEMO ///////////////////////////////////
function Demo_game(): JSX.Element {
  const [colorPick, setcolorPick] = useState<string>("");

  const localdata = localStorage.getItem("game1_props");
  const exampleData = localdata ? JSON.parse(localdata) : null;
  const exampleGrid = exampleData
    ? exampleData.Tcolored
    : Array.from({ length: 10 }, () => Array(10).fill(""));
  const [GridColor, setGridColor] = useState<string[][]>(
    Array.from({ length: 10 }, () => Array(10).fill(""))
  );
  return (
    <>
      <div className=" flex gap-10 items-center select-none">
        <Game_palette setcolorPick={setcolorPick} />
        <Table_game_coloring
          canChange={true}
          title={exampleData ? exampleData.titleEdit : "empty"}
          colorPick={colorPick}
          GridColors={[GridColor, setGridColor]}
          isEdit={false}
        />
        <Table_game_coloring
          canChange={false}
          title={"Пример"}
          colorPick={colorPick}
          GridColors={[exampleGrid, setGridColor]}
          isEdit={false}
        />
      </div>
      <button
        type="button"
        className="bg-green-500 w-1/4 h-15 
                      rounded-2xl shadow-2xl cursor-pointer"
        onClick={() => {
          console.log(isEqual(exampleGrid, GridColor) ? "РЕШЕНО" : "НЕ ВЕРНО");
        }}
      >
        Check :)
      </button>
    </>
  );
}

//////////////////////////// TABLE EDIT ///////////////////////////////////
function Edit_game(): JSX.Element {
  const [colorPick, setcolorPick] = useState<string>("");

  const [GridColor, setGridColor] = useState<string[][]>(
    Array.from({ length: 10 }, () => Array(10).fill(""))
  );
  return (
    <>
      <div className="flex gap-10 items-center select-none">
        <Game_palette setcolorPick={setcolorPick} />
        <Table_game_coloring
          canChange={true}
          title={""}
          isEdit={true}
          colorPick={colorPick}
          GridColors={[GridColor, setGridColor]}
        />
      </div>
    </>
  );
}

const isEqual = (a: string[][], b: string[][]) =>
  a.length === b.length &&
  a.every(
    (row, i) =>
      row.length === b[i].length && row.every((cell, j) => cell === b[i][j])
  );
