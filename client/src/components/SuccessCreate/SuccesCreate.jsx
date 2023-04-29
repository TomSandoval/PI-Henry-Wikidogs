import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import style from './SuccesCreate.module.css';
import { useDispatch } from 'react-redux';

export default function SuccesCreate(){

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch({
            type: "CREATE_ERROR"
        })
    }

    return (
        <div className={style.succesContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" width="224" height="224" viewBox="0 0 24 24" style={{fill: 'rgba(255, 255, 255, 1)'}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"></path></svg>
            <h2 className={style.succesText}>Breed create succesfully!</h2>
            <Link to='/home' className={style.link}><button className={style.button}>Back to home!</button></Link>
            <button onClick={()=>handleClick()} className={style.buttonBack}>Create other breed</button>
        </div>
    )
}