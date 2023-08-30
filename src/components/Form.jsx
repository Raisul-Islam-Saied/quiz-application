import style from "./styles/Form.module.css";

// eslint-disable-next-line react/prop-types
function Form({ className, children, ...rest }) {
  return (
    <form className={`${style.form} ${className}`} {...rest}>
      {children}
    </form>
  );
}

export default Form;
