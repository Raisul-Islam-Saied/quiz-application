import FormError from "./FormError";
import style from "./styles/FormControl.module.css";
// eslint-disable-next-line react/prop-types
function FormControl({ icon, errorMessage, onChange, value, ...rest }) {
  return (
    <div className={style.formControl}>
      <div className={style.textInput}>
        <input onChange={onChange} value={value} {...rest} />
        <span className="material-icons-outlined">{icon}</span>
      </div>
      {errorMessage && <FormError>{errorMessage}</FormError>}
    </div>
  );
}

export default FormControl;
