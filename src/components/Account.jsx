import { Link } from "react-router-dom";
import style from "./styles/Account.module.css";
import { useAuth } from "../context/authContext";
function Account() {
  const { currentUser, logout } = useAuth();

  return (
    <div className={style.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            {" "}
            account_circle
          </span>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Account"
            onClick={logout}
          >
            {" "}
            logout{" "}
          </span>{" "}
        </>
      ) : (
        <>
          <Link to="/login">login</Link>
          <Link to="/signup">signin</Link>
        </>
      )}

      {/* */}
    </div>
  );
}

export default Account;
