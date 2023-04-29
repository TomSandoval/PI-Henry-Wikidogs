import { CLEAN_DETAILS, CREATE_SUCCES, FILTER_BY_NAME, FILTER_BY_ORIGIN, FILTER_BY_TEMPERAMENTS, FILTER_BY_WEIGHT, FOUND, GET_ALL_DOGS, GET_DETAILS, GET_DOG_BY_NAME, GET_TEMPERAMENTS, LOAD, NO_FOUND, UNLOAD } from "./actions";


const initialState = {
    allDogs: [],
    dogs:[],
    temperaments: [],
    detail:[],
    isLoad: null,
    found: undefined,
    create: false,
    errorCreate: false,
    alreadyCreate: false
};



const rootReducer = (state = initialState,action) => {
    switch(action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                dogs:action.payload
            }
        case GET_TEMPERAMENTS:
            const cleanTemps = action.payload.filter(temp => temp.name !== "");

            return {
                ...state,
                temperaments: cleanTemps.sort((a,b)=> a.id - b.id)
            }
        case LOAD: {
            return {
                ...state,
                isLoad: true
            }
        }
        case UNLOAD: {
            return {
                ...state,
                isLoad: false
            }
        }
        case FOUND: {
            return {
                ...state,
                found: true
            }
        }
        case NO_FOUND: {
            return {
                ...state,
                found: false
            }
        }
        case GET_DOG_BY_NAME: {
            return {
                ...state,
                allDogs: action.payload
            }
        }
        case CLEAN_DETAILS: {
            return {
                ...state,
                detail: []
            }
        }
        case GET_DETAILS: {
            return {
                ...state,
                detail: action.payload
            }
        }
        case FILTER_BY_TEMPERAMENTS: {
            const {dogs} = state;
            let filterDogs = action.payload;

            filterDogs === "All" ? filterDogs = dogs : filterDogs = dogs.filter(dog => dog.temperaments.includes(action.payload))
            return {
                ...state,
                allDogs: filterDogs
            }
        }
        case FILTER_BY_ORIGIN: {
            const {dogs} = state;
            let response = null;
            const extractFromDB = dogs.filter(dog => typeof dog.id === "string");
            const extractFromAPI = dogs.filter(dog => typeof dog.id === "number");
            if(action.payload === "Created") {
                response = extractFromDB;
            }
            if(action.payload === "All") {
                response = dogs;
            }
            if(action.payload === "Defaults"){
                response = extractFromAPI;
            }
            
            return {
                ...state,
                allDogs: response,
            }
        }
        case FILTER_BY_WEIGHT: {
            const {allDogs} = state;
            let value = action.payload;
            let sortedWeight = null

            if(value === "minWeight"){
                sortedWeight = allDogs.sort((a, b) => {
                    if (parseInt(a.weight[1]) < parseInt(b.weight[1])) {
                      return -1;
                    }
                    if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                      return 1;
                    }
                    return 0;
                  });
            }

            if(value === "maxWeight"){
                sortedWeight = allDogs.sort((a, b) => parseInt(b.weight[1]) - parseInt(a.weight[1]));
            }
            
            return {
            ...state,
            allDogs: sortedWeight,
            };
        }
        case FILTER_BY_NAME: {
            const {allDogs} = state;
            let value = action.payload
            let sortedNames;
            console.log(action.payload)
            if(value === "A-Z"){
                sortedNames = allDogs.sort((a, b) => {
                   return a.name.localeCompare(b.name)
                })
            }
            else {
                sortedNames = allDogs.sort((a,b) => b.name.localeCompare(a.name))
            }

            return {
                ...state,
                allDogs: sortedNames
            }
        }
        case CREATE_SUCCES: {
            return {
                ...state,
                create: true
            }
        }
        case "CREATE_ERROR": {
            return {
                ...state,
                create: false
            }
        }
        case "FAILED_CREATE": {
            return {
                ...state,
                errorCreate: true
            }
        }
        case "CLEAN_FAILED": {
            return {
                ...state,
                errorCreate: false
            }
        }
        case "ALREADY_CREATE": {
            return {
                ...state,
                alreadyCreate: true
            }
        
        }
        case "CLEAN_ALREADY": {
            return {
                ...state,
                alreadyCreate: false
            }
        }
        default:
            return {...state};
    }
}


export default rootReducer;