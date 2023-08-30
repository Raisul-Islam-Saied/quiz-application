import style from "./styles/Button.module.css";
// eslint-disable-next-line react/prop-types
function Button({ className, children, ...rest }) {
  return (
    <button className={`${style.button} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
