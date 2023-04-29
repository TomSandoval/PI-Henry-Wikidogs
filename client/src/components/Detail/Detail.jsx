import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import style from './Detail.module.css'
import Nav from '../Nav/Nav';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsDog } from '../../redux/actions';
import Loading from '../Loading/Loading';
import SearchError from '../SearchError/SearchError';


export default function Detail(){

    const {id} = useParams();
    const dog = useSelector(state => state.detail);
    const found = useSelector(state => state.found)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getDetailsDog(id))
    },[dispatch,id])

    return(
        <>
            {found ? <><Nav view={false}/>
            <main className={style.mainDetail}>
                {dog[0]?.name ? <div className={style.detailContainer}>
                    <div className={style.detailText}>
                        <h1 className={style.detailName}>{dog[0].name}</h1>
                            <h2 className={style.weightTitle}>Weight:</h2>
                        <div className={style.weightContainer}>
                            <p className={style.weightText}>Min Weight: {dog[0]?.weight[0]} Kg</p> <p className={style.weightText}>Max Weight: {dog[0]?.weight[1]} Kg</p>
                        </div>
                            <h2 className={style.heightTitle}>Height:</h2>
                        <div className={style.heightContainer}>
                            <p className={style.heightText}>Min Height: {dog[0]?.height[0]} cm</p> <p className={style.heightText}>Max Height: {dog[0]?.height[1]} cm</p>
                        </div>
                            <h2 className={style.weightTitle}>Life span:</h2>
                        <div className={style.weightContainer}>
                            <p className={style.weightText}>{dog[0]?.life_span}</p>
                        </div>
                        <h2 className={style.tempsTitle}>Temperaments:</h2>
                        <div className={style.tempsContainer}>
                    { dog[0].temperaments?.map((temp,index) => <h3 key={index} className={style.tempsText}>{temp}</h3>)}
                    </div>
                    </div>
                    <img src={dog[0].image} alt="Dog" className={style.detailImage}></img>
                </div> : <Loading/>}
            </main> </> : <div className={style.errorContainer}><SearchError/></div>}
        </>
    )

}


