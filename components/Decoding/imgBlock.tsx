import { game_prop } from "./DecodingGame";
import { JSX, Dispatch, SetStateAction, ReactElement } from "react";


type BlockProps = {
  isSelect: string;
  gameProps: [game_prop, Dispatch<SetStateAction<game_prop>>];
};
export default function ImageBlock({ isSelect, gameProps }: BlockProps): JSX.Element {
  const [game_props, setGame_props] = gameProps;
  const inputHelp: ReactElement = (
    <input
      type="text"
      onChange={(e) => {
        setGame_props((prev: game_prop) => ({
          ...prev,
          labels: [e.target.value, prev.labels[1]],
        }));
      }}
      className="border-b-2 border-blue-400 outline-none 
                focus:border-2 rounded-md text-center w-2/3"
      placeholder="Подсказка"
    />
  );
  const text_help = isSelect == "EDIT" ? inputHelp : game_props.labels[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setGame_props((prev: game_prop) => ({
        ...prev,
        img: result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="w-1/3 h-full p-4 border-r-1 border-gray-300 rounded-xl">
        <div className="w-full h-2/3 overflow-hidden shadow-md flex items-center justify-center">
          {isSelect == "EDIT" ? (
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          ) : (
            game_props.img? <img className="w-full object-cover" alt="gameImg" src={game_props.img} /> : ''
          )}
        </div>
        <div className="mt-3 text-center text-xl">{text_help}</div>
      </div>
    </>
  );
}
