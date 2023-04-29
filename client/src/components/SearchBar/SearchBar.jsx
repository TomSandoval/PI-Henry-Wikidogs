import { useState } from 'react';
import style from './SearchBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getDog } from '../../redux/actions';


export default function SearchBar(props){
    
    const [value,setValue] = useState("");
    const dispatch = useDispatch();

    const allDogs = useSelector(state => state.allDogs);
    const dogs = useSelector(state => state.dogs);


    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getDog(value))
        props.setCurrentPage();
    }

    const handleClick = () => {
        dispatch(getAllDogs());
        setValue("");
    }


    return(
        <div className={style.searchContainer}>
            { allDogs !== dogs ?  <button onClick={handleClick} className={style.searchRefreshButton}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" style={{fill: "rgba(255, 255, 255, 1)"}}><path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path></svg></button> : null }
            <input autoComplete='off' className={style.inputSearch} type='text' name='SearchDog' value={value} onChange={handleChange} placeholder='Search Dog'/>
            <button onClick={handleSearch} className={style.buttonSearch}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(255, 255, 255, 1)"}}><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg></button>
        </div>
    )
}