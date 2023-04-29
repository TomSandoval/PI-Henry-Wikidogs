import style from './SearchError.module.css';
import gifSearching from '../../assets/searchDog.gif'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { getAllDogs } from '../../redux/actions';

export default function SearchError(){

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(getAllDogs())
    }

    return (
        <div className={style.errorContainer}>
            <img src={gifSearching} alt='Not Found' className={style.errorGif}/>
            <h1 className={style.errorMesagge}>ERROR 404 : DOG NOT FOUND :&#40;</h1>
            <Link to='/home'><button onClick={handleClick}>Back to Home!</button></Link>
        </div>
    )
}