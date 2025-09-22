import { Dispatch, ReactElement, SetStateAction, useState } from "react";

type game_props = {
  title: string;
  colorPick: string;
  canChange: boolean;
  GridColors: [string[][], Dispatch<SetStateAction<string[][]>>];
  isEdit: boolean;
};
export default function Table_game_coloring({
  colorPick,
  title,
  canChange,
  GridColors,
  isEdit,
}: game_props) {
  const [Tcolored, setTcolored] = GridColors;
  const [titleEdit, setTitleEdit] = useState("");
  const input_title: ReactElement = (
    <input
      className="border-0 border-b-2 rounded-md px-2"
      placeholder="|"
      value={titleEdit}
      onChange={(e) => {
        setTitleEdit(e.target.value);
      }}
    />
  );
  const saveHandler = () => {
    ///////////////// Fetch here) //////////////////
    localStorage.setItem('game1_props', JSON.stringify({ titleEdit, Tcolored }))
  }

  return (
    <div className="flex flex-col gap-3">
      <table className="border-2 border-black">
        <caption className="text-xl font-bold mb-3">
          {isEdit ? input_title : title}
        </caption>
        <tbody>
          <Table_row
            canChange={canChange}
            colored={null}
            index={0}
            isHead={true}
            setTC={setTcolored}
            colorPick={""}
          />

          {Array.from({ length: 10 }).map((_, index) => (
            <Table_row
              canChange={canChange}
              key={`row-${index}`}
              colored={Tcolored}
              colorPick={colorPick}
              index={index + 1}
              isHead={false}
              setTC={setTcolored}
            />
          ))}
        </tbody>
      </table>
      {isEdit ? (
        <button
          onClick={() => saveHandler() }
          className="bg-green-500 w-full h-15 
                    rounded-2xl shadow-2xl cursor-pointer"
        >
          Save
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

type Row_props = {
  index: number;
  isHead: boolean;
  colored: string[][] | null;
  colorPick: string;
  setTC: Dispatch<SetStateAction<string[][]>>;
  canChange: boolean;
};
function Table_row({
  index,
  isHead,
  colored,
  setTC,
  colorPick,
  canChange,
}: Row_props) {
  return (
    <tr className="border border-black">
      <th
        className={`w-8 h-8 border border-black cursor-pointer select-none ${
          isHead ? "" : "border-r-3"
        }`}
      >
        {index}
      </th>

      {Array.from({ length: 10 }).map((_, i) => (
        <th
          onClick={() => {
            if (!isHead && canChange) {
              setTC((prev: string[][]) => {
                const newGrid = prev.map((row) => [...row]);
                newGrid[index - 1][i] = colorPick;
                return newGrid;
              });
            }
          }}
          key={`col-${index}-${i}`}
          className={`w-8 h-8 border border-black 
                                cursor-pointer select-none 
                                ${isHead ? "border-b-3 " : ""} ${
            colored ? colored[index - 1][i] : "bg-slate-200"
          }`}
        >
          {isHead ? i + 1 : ""}
        </th>
      ))}
    </tr>
  );
}
