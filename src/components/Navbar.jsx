import { Link } from "react-router-dom";
import brandImage from "../assets/images/logo-bg.png";
import Account from "./Account";
import style from "./styles/Navbar.module.css";
function Navbar() {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <Link to="/" className={style.brand}>
            <img src={brandImage} alt="" />
            <h3>Raisul Islam Saied</h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}

export default Navbar;
