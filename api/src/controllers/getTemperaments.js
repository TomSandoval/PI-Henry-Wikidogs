const {getAllTemperaments} = require("../handlers/getAllTemperaments");


const getTemperaments = async(req,res) => {
    try {
        const allTemps = await getAllTemperaments();
        res.status(200).send(allTemps)
    } catch (error) {
        res.status(404).send(error)
    }
}


module.exports = {
    getTemperaments
}