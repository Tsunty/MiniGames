import { Dispatch, SetStateAction, JSX } from "react";

type DE_props = {
  StateSelectDE: [string, Dispatch<SetStateAction<string>>];
};
export default function Demo_Edit({ StateSelectDE }: DE_props): JSX.Element {
  return (
    <div className="flex justify-around">
      <DE_btn title={"DEMO"} StateSelectDE={StateSelectDE} />
      <DE_btn title={"EDIT"} StateSelectDE={StateSelectDE} />
    </div>
  );
}

type DE_btn_props = {
  title: string;
  StateSelectDE: [string, Dispatch<SetStateAction<string>>];
};
function DE_btn({ title, StateSelectDE }: DE_btn_props): JSX.Element {
  const [isSelect, setisSelect] = StateSelectDE;
  const selectColor = StateSelectDE[0] == title ? "bg-gray-50" : "bg-gray-200";
  return (
    <div
      onClick={() => setisSelect(title)}
      className={`w-1/6 h-16 rounded-t-2xl cursor-pointer
                    flex justify-center items-center select-none
                    ${selectColor}`}
    >
      {title}
    </div>
  );
}
