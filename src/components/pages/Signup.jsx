
import img from "../../assets/images/signup.svg";

import Illustration from "../Illustration";
import SignupForm from "../SignupForm";

const Signup = () => {
  return (
    <>
      <h1 className="form-title">Create An Account</h1>
      <div className="column">
        <Illustration src={img} alt="signup" />
        <SignupForm />
      </div>
    </>
  );
};

export default Signup;
