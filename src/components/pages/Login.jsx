
import img from "../../assets/images/login.svg";

import Illustration from "../Illustration";
import LoginForm from "../LoginForm";

const Login = () => {
  
  return (
    <>
      <h1 className="form-title">Login to your account</h1>
      <div className="column">
        <Illustration src={img} alt="login" />
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
