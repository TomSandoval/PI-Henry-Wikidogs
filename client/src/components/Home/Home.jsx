import style from "./Home.module.css";
import Nav from '../Nav/Nav'
import Card from "../Card/Card"
import SearchError from "../SearchError/SearchError";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByOrigin, getAllDogs, filterByWeight, filterByTemperaments, getTemperaments,filterByName, cleanDetails,} from "../../redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Paginate from "../Paginate/Paginate";
import Loading from "../Loading/Loading";


export default function Home() {

  const found = useSelector(state => state.found)
  const isLoad = useSelector(state => state.isLoad)
  const allDogs = useSelector((state) => state.allDogs);
  const dogs = useSelector(state => state.dogs)
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  let [currentPage, setCurrentPage] =useState(1);
  let [auxForPaginate,setAuxForPaginate] = useState(0)
  
  let dogsPerPage = 8;
  let lastIndex = dogsPerPage * currentPage;
  let firstIndex = lastIndex - dogsPerPage;
  let dogsInPage = allDogs.slice(firstIndex,lastIndex);

  useEffect(() => {
    if(allDogs !== dogs){
      dispatch(getAllDogs());
    }
    dispatch({
      type: "CREATE_ERROR"
    })
    dispatch({
      type: "CLEAN_FAILED"
    })
    dispatch({
      type: "CLEAN_ALREADY"
  })
    dispatch(cleanDetails())
    dispatch(getTemperaments())
  }, [dispatch]);


  const resetCurrentPage = () => {
    setCurrentPage(1);
    setAuxForPaginate(0)
  }

  const [order, setOrder] = useState("")

  const toFirstPage = (firstPage) => {
    setCurrentPage(firstPage);
    setAuxForPaginate(0)
  };

  const toLastPage = (lastPage,number) => {
    setCurrentPage(lastPage);
    setAuxForPaginate(number)
  }

  const sumPage = (actualPage) => {
    setCurrentPage(actualPage + 1)
    setAuxForPaginate(auxForPaginate + 1)
  }

  const restPage = (actualPage) => {
    setCurrentPage(actualPage - 1)
    setAuxForPaginate(auxForPaginate - 1)
  }

  const handleChange = (event) => {
    setCurrentPage(1)
    setAuxForPaginate(0)
    dispatch(filterByTemperaments(event.target.value))
  };

  const handleOriginChange = (event) => {
    setCurrentPage(1);
    setAuxForPaginate(0)
    dispatch(filterByOrigin(event.target.value))
  }

  const handleWeightFilter = (event) => {
    const value = event.target.value || event.target.getAttribute("value")
    dispatch(filterByWeight(value))
    setOrder(value)
  }

  const handleAlphabeticFilter = (event) => {
    dispatch(filterByName(event.target.value))
    setOrder(event.target.value)
  }

  return (
    <>    
      {found && <Nav setCurrentPage={resetCurrentPage}/>}
    <div className={style.allContainerMain}>
      <>{found && <div className={style.filtersContainer}>
          <div className={style.tempsFilter}>
              <h4>Filter by temperaments</h4>
              <div>
                <select onChange={handleChange}>
                  <option value="All">All</option>
                  {temperaments?.map(temp => <option key={temp.id} value={temp.name}>{temp.name}</option>)}
                </select>
              </div>


          </div>
          <div className={style.originFilter}>
            <h4>Filter by origin:</h4>
            <select onChange={handleOriginChange}>
              <option value="All">All</option>
              <option value="Created">Created</option>
              <option value="Defaults">Default</option>
            </select>
          </div>
          <div className={style.weightFilter}>
            <h4>Sort By Weight:</h4>
            <div>
             <button  onClick={handleWeightFilter} value="maxWeight"><svg value="maxWeight" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)'}}><path value="maxWeight" d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path></svg>Max</button>
            <button  onClick={handleWeightFilter} value="minWeight"><svg value='minWeight' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)'}}><path value='minWeight' d="m18.707 12.707-1.414-1.414L13 15.586V6h-2v9.586l-4.293-4.293-1.414 1.414L12 19.414z"></path></svg>Min</button> 
            </div>

          </div>
          <div className={style.alphabeticFilter}>
            <h4>Sort alphabetically:</h4>
            <div>
            <button onClick={handleAlphabeticFilter} value="A-Z">A-Z</button>
            <button onClick={handleAlphabeticFilter} value="Z-A">Z-A</button> 
            </div>

          </div>
        </div>}</>
        
        <main>
            {
                isLoad && dogsInPage.length ? <>
                {found ? <div className={style.cardsContainer}>{dogsInPage?.map(dog => <Link className={style.linkCard} key={dog.id} to={`/detail/${dog.id}`}>
                <Card key={dog.id} name={dog.name} weight={dog.weight} image={dog.image} temperaments={dog.temperaments}/>
                </Link>)}
                </div> : <SearchError/>}
                {found ? <div className={style.paginateContainer}>
                <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs} toFirstPage={toFirstPage} toLastPage={toLastPage} currentPage={currentPage} sumPage={sumPage} restPage={restPage} aux={auxForPaginate}/>
            </div> : null}
                </> 
                : <Loading/>
            }
        </main>
    </div>  
    </>
  );
}
