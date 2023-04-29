const {createNewDog} = require("../handlers/postDog");



const postDog = async(req,res) => {
    const {
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        life_span,
        image,
        temperaments
    } = req.body;

    try {
        const dogCreate = await createNewDog(name,minHeight,maxHeight,minWeight,maxWeight,life_span,image,temperaments);
        res.status(200).json({msg: dogCreate})
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}

module.exports = {
    postDog
}