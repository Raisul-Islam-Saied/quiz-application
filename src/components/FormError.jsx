import style from "./styles/FormError.module.css";
// eslint-disable-next-line react/prop-types
const FormError = ({ className ,children }) => {
  return <p className={`${style.formError} ${className}`}>{children} </p>;
};

export default FormError;
