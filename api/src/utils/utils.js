const {API_KEY} = process.env;
const {Dog, Temperament} = require("../db")
const axios = require("axios");
const URL_BASE = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getAPiData = async () => {
    const response = await axios.get(URL_BASE);
    const dogData = response.data.map(dog => {

        let temperamentArr = [];
        if(dog.temperament){
            temperamentArr = dog.temperament.split(", ");
        }

        let heightArr= [];
        if(dog.height){
            heightArr = dog.height.metric.split(" - ");
        }
        let weightArr = [];
        if(dog.height){
            weightArr = dog.weight.metric.split(" - ");
        }

        return {
            id: dog.id,
            name: dog.name,
            height: heightArr,
            weight: weightArr,
            temperaments: temperamentArr,
            life_span: dog.life_span,
            image: dog.image.url
        }
    })
    return dogData;
};

const getDBData = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], 
            through: {
                attributes: [],
            },
            attributes: {exclude: ['updatedAt', 'createdAt', "id"]}
        }
    })
};

const getAllDogs = async () => {
    const dataApi = await getAPiData();
    const dataDb = await getDBData();
    const allData = [...dataApi, ...dataDb];
    return allData;
}


module.exports= {
    getAPiData,
    getDBData,
    getAllDogs,
    URL_BASE,
}