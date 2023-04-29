import style from "./LandingPage.module.css";
import welcomeImage from "../../assets/welcomeOriginal.png";
import welcomeImageMoved from "../../assets/welcomeMoved.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../assets/WikiDogsLogo.png";
import { useState } from "react";

export default function LandingPage() {
  const [image, setImage] = useState(true);

  const handlerMouse = () => {
    setImage(!image);
  };

  return (
    <main className={style.allContainer}>
      <div className={style.leftMenu}>
        <img className={style.logo} src={logo} alt="WikiDogs" />
        <div className={style.textWelcome}>
          <h1>Welocome to WikiDogs!</h1>
          <h4>By Tomás Sandoval</h4>
        </div>
        <Link to="/home" className={style.button} onMouseOver={handlerMouse} onMouseLeave={handlerMouse}>
          Let's Go!
        </Link>
        <div className={style.skew}></div>
      </div>
      <div className={style.rightMenu}>
        <picture className={style.imageContainer}>
          <img
            className={image ? style.welcomeImage : style.welcomeImageMoved}
            src={image ? welcomeImage : welcomeImageMoved}
            alt="Welcome Dog"
          ></img>
        </picture>
      </div>
    </main>
  );
}
