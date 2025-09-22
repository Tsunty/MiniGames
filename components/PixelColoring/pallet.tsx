import { EraserIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Pallet_props = {
    setcolorPick:  Dispatch<SetStateAction<string>>

}
export default function Game_palette({setcolorPick}:Pallet_props) {
    const colors: string[] = ['bg-red-500', 'bg-yellow-500', 'bg-green-500',
                            'bg-blue-500', 'bg-orange-500', 'bg-purple-500', 'bg-black', '']
    
  return (
    <>
      <div className=" flex flex-col items-center gap-2">
        {colors.map((color, index) =>(
            <Game_color color={color} key={'c-' + color} onClick={()=>setcolorPick(color)}/>
        ))}
      </div>
    </>
  );
}

type gColorProps = {
  color: string
  onClick: () => void
}
function Game_color({color, onClick}:gColorProps) {
  return <div 
      onClick={onClick}
        className={`w-9 h-9 rounded-full
                    cursor-pointer select-none flex justify-center items-center
                    ${color}`}> {color === ''? <EraserIcon width={40}/>: ''} </div>;
}
