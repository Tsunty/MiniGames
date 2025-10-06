import { game_prop } from "./DecodingGame";
import { JSX, Dispatch, SetStateAction, ReactElement, useState, useRef } from "react";

type BlockProps = {
  isSelect: string;
  gameProps: [game_prop, Dispatch<SetStateAction<game_prop>>];
};
export default function CodeBlock({
  isSelect,
  gameProps,
}: BlockProps): JSX.Element {
  const [game_props, setGame_props] = gameProps;
  const inputHelp = (
    <input
      type="text"
      onChange={(e) => {
        setGame_props((prev: game_prop) => ({
          ...prev,
          labels: [prev.labels[0], e.target.value],
        }));
      }}
      className="border-b-2 border-blue-400 outline-none 
                focus:border-2 rounded-md text-center w-2/3"
      placeholder="Подсказка"
    />
  );
  const text_help: ReactElement | string =
    isSelect == "EDIT" ? inputHelp : game_props.labels[1];
  const code_input: ReactElement = (
    <input
      type="text"
      onChange={(e) => {
        setGame_props((prev: game_prop) => ({
          ...prev,
          secret_code: e.target.value,
        }));
      }}
      className="border-b-2 border-blue-400 outline-none shadow-md
                focus:border-2 rounded-md text-center h-12 w-2/3 text-xl"
      placeholder="Код"
    />
  );

  const [userCode, setUserCode] = useState<string>("");
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const input_cells: ReactElement[] = game_props.secret_code
    .split("")
    .map((char, index) => {
      return (
        <input
          key={`cell-${index}`}
          type="text"
          className="w-10 h-10 border-b-2 rounded-md outline-none shadow-md
                    focus:border-2 border-blue-400 text-center text-xl"
          maxLength={1}
          ref={(el) => {
            if (el) inputsRef.current[index] = el;
          }}
          onChange={(e) => {
            inputsRef.current[index + 1]?.focus();
            setUserCode((prev) => {
              const update = [...prev];
              update[index] = e.target.value;
              return update.join("");
            });
          }}
        />
      );
    });
  const secret_div = isSelect == "DEMO" ? input_cells : code_input;

  return (
    <>
      <div className="w-2/3 h-full p-3 flex flex-col items-center">
        <div className="mt-3 text-center mb-10 w-full text-2xl">
          {text_help}
        </div>
        <div className="flex justify-center items-center gap-1 w-full flex-wrap">
          {secret_div}
        </div>
        <button
          type="button"
          className="bg-green-500 w-1/4 h-15 mt-auto 
                      rounded-2xl shadow-2xl cursor-pointer"
          onClick={() => {
            if (isSelect == "EDIT") {
              ///////////////// Fetch here) //////////////////
              localStorage.setItem("game3_props", JSON.stringify(game_props));
            } else {
                if (game_props.secret_code.toLocaleLowerCase() == userCode.toLocaleLowerCase()) {
                    console.log("Верно");
                } else {
                    console.log("Не верно!");
                }
            }
          }}
        >
          {isSelect == "EDIT" ? "Save" : "Check :)"}
        </button>
      </div>
    </>
  );
}
