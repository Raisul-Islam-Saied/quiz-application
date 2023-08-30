import img from "../assets/images/success.png";

import style from "./styles/Summary.module.css";

// eslint-disable-next-line react/prop-types
const Summary = ({ score, noq }) => {
  return (
    <div className={style.summary}>
      <div className={style.point}>
        <p className={style.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>
      <div className={style.badge}>
        <img src={img} />
      </div>
    </div>
  );
};

export default Summary;
