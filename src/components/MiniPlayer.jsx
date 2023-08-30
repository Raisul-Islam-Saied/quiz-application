import { useState } from "react";
import ReactPlayer from "react-player/youtube";

import style from "./styles/MiniPlayer.module.css";
// eslint-disable-next-line react/prop-types
const MiniPlayer = ({ id, title }) => {
  const [show, setShow] = useState(false);
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;
  return (
    <div className={show ? style.miniPlayer : style.floatingBtn}>
      <span
        className={`${style.open} material-icons-outlined `}
        onClick={() => {
          setShow(true);
        }}
      >
        {" "}
        play_circle_filled
      </span>
      <span
        className={`${style.close} material-icons-outlined `}
        onClick={() => {
          setShow(false);
        }}
      >
        close
      </span>
      <ReactPlayer
        width="300px"
        height="180px"
        url={videoUrl}
        playing={show}
        controls
        className={style.player}
      />
      <p>{title}</p>
    </div>
  );
};

export default MiniPlayer;
