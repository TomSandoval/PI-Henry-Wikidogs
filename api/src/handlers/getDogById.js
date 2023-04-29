const { getAPiData, getDBData, getAllDogs } = require("../utils/utils");

const getDogById = async(id) => {
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(can => can.id == id);

    if(dog.length > 0){
        return dog;
    } else {
        throw new Error("Dog not found")
    }
};

module.exports = {
  getDogById,
};
