/* eslint-disable react/prop-types */
import style from "./styles/ChackBox.module.css";
// eslint-disable-next-line no-unused-vars
function ChackBox({text ,error , ...rest}) {
  return (
    <label className={style.terms} form="chack">
      <input type="checkbox" name="" id="chack" {...rest} />
      <span> {text} </span>
    </label>
  );
}

export default ChackBox;
