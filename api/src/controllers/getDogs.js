const {getDogs} = require("../handlers/getAllDogs");



const getDogsDetail = async (req,res) => {
    const { name } = req.query;

    try {
        const allDogs = await getDogs(name);
        res.status(200).send(allDogs)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    getDogsDetail
} 