/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "./styles/Video.module.css";
function Video({ noq, title, id }) {
  return (
    <Link to={noq > 0 ? `/quiz/${id}` : ""} state={title }>
      <div className={style.video}>
        <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt="" />
        <p className={style.title}>{title}</p>
        <div className={style.qmeta}>
          <p>{noq} Questions</p>
          <p> Point : {noq * 5}</p>
        </div>
      </div>
    </Link>
  );
}

export default Video;
