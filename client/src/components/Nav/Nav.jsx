import style from "./Nav.module.css";
import logo from "../../assets/WikiDogsLogo.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../SearchBar/SearchBar";

export default function Nav(props) {
  return (
    <nav className={style.nav}>
      <div className={style.leftNav}>
        <Link to="/home">
          <img src={logo} className={style.homeButton} alt="home" />
        </Link>
      </div>

      {props.view === false ? null : <SearchBar setCurrentPage = {props.setCurrentPage}/>}
      <div className={style.rigthNav}>
        <Link className={style.create} to='/create'>Create breed</Link>
      </div>
    </nav>
  );
}
