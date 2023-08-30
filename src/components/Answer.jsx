import style from "./styles/Answer.module.css";

// eslint-disable-next-line react/prop-types
function Answer({ id, className, children, ...rest }) {
  return (
    <label htmlFor={id} className={`${style.answer} ${className}`}>
      <input type="checkbox" id={id} {...rest} />
      {children}
    </label>
  );
}

export default Answer;
