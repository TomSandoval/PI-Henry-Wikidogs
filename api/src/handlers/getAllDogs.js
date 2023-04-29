
const {getAllDogs} = require("../utils/utils");


const getDogs = async (name) => {
    const allDogs = await getAllDogs();
    if(name){
        const dog = allDogs.filter(can => can.name.toLowerCase().includes(name.toLowerCase()));

        if(dog.length > 0){
            return dog
        } else {
            throw new Error ("Dog not found")
        }
    }
    return allDogs;
}

module.exports = {
    getDogs
}