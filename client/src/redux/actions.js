import axios from "axios";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const LOAD = "LOAD";
export const UNLOAD = "UNLOAD";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const FOUND = "FOUND";
export const NO_FOUND = "NO_FOUND";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const CREATE_SUCCES = "CREATE_SUCCES";
const URL_BASE = "http://localhost:3001";

export function getAllDogs() {
  return async function (dispatch) {
    dispatch({ type: UNLOAD });
    dispatch(cleanDetails());
    try {
      const response = await axios.get(`${URL_BASE}/dogs`);
      const cleanDogs = response.data.map((dog) => {
        if (typeof dog.id === "string") {
          let temps = [];
          dog.temperaments.map((temp) => temps.push(temp.name));
          dog.temperaments = temps;
        }
        return dog;
      });
      dispatch({
        type: GET_ALL_DOGS,
        payload: cleanDogs,
      });
      dispatch({
        type: FOUND,
      });
    } catch (error) {
      console.log(error);
    }

    dispatch({
      type: LOAD,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    const response = await axios.get(`${URL_BASE}/temperaments`);
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: response.data,
    });
  };
}

export function getDog(name) {
  return async function (dispatch) {
    dispatch({ type: UNLOAD });

    try {
      const response = await axios.get(`${URL_BASE}/dogs?name=${name}`);
      const cleanDog = response.data.map((dog) => {
        if (typeof dog.id === "string") {
          let temps = [];
          dog.temperaments.map((temp) => temps.push(temp.name));
          dog.temperaments = temps;
        }
        return dog;
      });
      dispatch({
        type: GET_DOG_BY_NAME,
        payload: cleanDog,
      });
      dispatch({
        type: FOUND,
      });
      return dispatch({ type: LOAD });
    } catch (error) {
      dispatch({ type: LOAD });
      dispatch({ type: NO_FOUND });
    }
  };
}

export function getDetailsDog(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_BASE}/dogs/${id}`);
      const cleanDog = response.data.map((dog) => {
        if (typeof dog.id === "string") {
          let temps = [];
          dog.temperaments.map((temp) => temps.push(temp.name));
          dog.temperaments = temps;
        }
        return dog;
      });
      dispatch({
        type: GET_DETAILS,
        payload: cleanDog,
      });
    } catch (error) {
      dispatch({
        type: NO_FOUND,
      });
    }
  };
}

export function cleanDetails() {
  return {
    type: CLEAN_DETAILS,
  };
}

export function filterByTemperaments(temp) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload: temp,
  };
}

export function filterByOrigin(origin) {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
}

export function filterByWeight(value) {
  return {
    type: FILTER_BY_WEIGHT,
    payload: value,
  };
}

export function filterByName(value) {
  return {
    type: FILTER_BY_NAME,
    payload: value,
  };
}

export function postDog(form) {
    return async function(dispatch) {
        try {
            if (form.name === "") form.name = null;
            if (form.minWeight === "") form.minWeight = null;
            if (form.maxWeight === "") form.maxWeight = null;
            if (form.minHeight === "") form.minHeight = null;
            if (form.maxHeight === "") form.maxHeight = null;

            await axios.post(`${URL_BASE}/dogs`,form)
            dispatch({
                type: CREATE_SUCCES
            })
        } catch (error) {
          const errors = {
            alreadyCreated : "That breed has already been created"
          }
            if(error.response.data.msg === errors.alreadyCreated){
              return dispatch({
                type: "ALREADY_CREATE"
              })
            }
            dispatch({
                type: "FAILED_CREATE"
            })
        }
    }
}
