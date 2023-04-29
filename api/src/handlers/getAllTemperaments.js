const {Temperament} = require("../db");
const axios = require("axios");
const {URL_BASE} = require("../utils/utils")


const getAllTemperaments = async () => {
    const dataAPi = await axios.get(URL_BASE)
    const allTemperaments = dataAPi.data.map(dog => dog.temperament);
    const orderTemps = allTemperaments.toString().split(",");
    orderTemps.forEach(temp => {
        let cleanTemp = temp.trimStart().trimStart();
        Temperament.findOrCreate({
            where: {name: cleanTemp}
        })
    })

    const allTemps = await Temperament.findAll({
        attributes: {exclude: ['updatedAt', 'createdAt']}
    });

    return allTemps;
}


module.exports = {
    getAllTemperaments
}