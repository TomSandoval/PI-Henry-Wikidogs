import { useEffect } from "react";
import "./Paginate.css"

export default function Paginate({allDogs,dogsPerPage,sumPage,restPage,currentPage,aux,toFirstPage,toLastPage}){

    const totalPages = [];
    let viewPages = [];

    
    for (let i = 1; i <= Math.ceil(allDogs.length / dogsPerPage); i++) {
        totalPages.push(i)
    };
    
    

    if(totalPages[aux - 1] !== undefined ){
        viewPages.push(totalPages[aux -1]);
    };

    if(currentPage !== -1){
        viewPages.push(currentPage);
    };

    if(totalPages[aux + 1] !== undefined){
        viewPages.push(totalPages[aux +1])
    }; 

    let classCheck = "uno";
    // * UNO PARA CUANDO SON 3
    // * DOS PARA CUANDO SON 2 Y ES EL PRINCIPIO DEL PAGINADO
    // * TRES PARA CUANDO SON 2 Y ES EL FINAL DEL PAGINADO
    if(viewPages.length === 2){
        if(viewPages[0] === 1){
            classCheck = "dos"
        } else {
            classCheck = "tres"
        }
    }

    return (
        <ul className="listPagesContainer">
            <button onClick={()=> toFirstPage(1)} className="buttonPage">&lt; &lt;</button>
            <button onClick={()=> currentPage !== 1 ? restPage(currentPage): null} className="buttonPage">&lt;</button>
            {viewPages.map(number => <li key={number} className={classCheck}>{number}</li>)}
            <button onClick={()=> totalPages[totalPages.length-1] !== currentPage ? sumPage(currentPage) : null} className="buttonPage">&gt;</button>
            <button onClick={()=> toLastPage(totalPages[totalPages.length-1], totalPages[totalPages.length-1]-1)} className="buttonPage">&gt; &gt;</button>
        </ul>
    )
}