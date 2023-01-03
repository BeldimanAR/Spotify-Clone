import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i }) => {
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div />
    </div>
  );
};

export default SongCard;
