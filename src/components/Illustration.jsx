import style from "./styles/Illustration.module.css";
// eslint-disable-next-line react/prop-types
const Illustration = ({ src, ...rest }) => {
  return (
    <div className={style.illustration}>
      <img src={src} {...rest} />
    </div>
  );
};

export default Illustration;
