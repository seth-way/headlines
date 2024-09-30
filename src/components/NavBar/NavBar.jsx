import "./NavBar.css";
import NavIcon from "../ui/NavIcon/NavIcon";
import { getDate } from "../../lib/utils";

const NavBar = () => {

  return (
    <nav>
      <div id="nav-primary">
        <p>{getDate()}</p>
        <h1>The Keuka Corrier</h1>
        <NavIcon/>
      </div>
      <div id="nav-secondary">
        filters:
      </div>
    </nav>
  );
};

export default NavBar;
