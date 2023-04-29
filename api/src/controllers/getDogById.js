const {getDogById} = require("../handlers/getDogById");


const dogByID = async(req,res) =>{
    const { idRaza } = req.params;
    try {
        const dog = await getDogById(idRaza);
        res.status(200).json(dog);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
    
}


module.exports = {
    dogByID
}