import style from "./Loading.module.css";
import gifDog from "../../assets/walkingDog.gif"

export default function Loading() {
  return (
    <div className={style.loadingContainer}>
      <img src={gifDog} alt="Loading Gif" className={style.gifDog}></img>
      <h3>Loading ...</h3>
    </div>
  );
}
