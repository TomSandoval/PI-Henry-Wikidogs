import style from "./Card.module.css"


export default function Card({name,image,weight,temperaments}){


    return (
        <div className={style.container}>
            <img src={image} className={style.image} alt="Dog"/>
            <div className={style.textContainer}>
            <h1 className={style.nameText}>{name}</h1>
            <div className={style.hoverText}>
            <h3 className={style.heightText}>Min-Weight: {weight[0]}Kg | Max-Weight: {weight[1]}Kg</h3>
            <h2>Temperaments:</h2>
            {
                temperaments.map((temps,index) => <h3 key={index} className={style.tempText}>{`${temps}`}</h3>)
            }
            </div>
            </div>
        </div>
    )
}