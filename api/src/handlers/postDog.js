const { Dog } = require("../db");
const { Temperament } = require("../db");

const createNewDog = async (
  name,
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
  life_span,
  image,
  temperaments
) => {
  const heigth = [];
  const min_Height = minHeight;
  const max_Height = maxHeight;
  heigth.push(min_Height, max_Height);

  const weight = [];
  const min_Weight = minWeight;
  const max_Weight = maxWeight;
  weight.push(min_Weight, max_Weight);

  const [newDog, created] = await Dog.findOrCreate({
    where: { name: name },
    defaults: {
      height: heigth,
      weight: weight,
      life_span: life_span,
      image: image
        ? image
        : "https://img.freepik.com/vector-gratis/lindo-perro-sacando-lengua-ilustracion-icono-dibujos-animados_138676-2709.jpg?w=826&t=st=1681315699~exp=1681316299~hmac=fcefd7860a1dc264c48742b604cc336c821f115d3d26cbfa8fcdb3e8e61267c8",
    },
  });

  if (created) {
    let tempsOfDog = await Temperament.findAll({
      where: { name: temperaments },
    });
    
    newDog.addTemperament(tempsOfDog);
    
    return "Dog successfully created";
  } else {
    throw new Error("That breed has already been created");
  }
};

module.exports = {
  createNewDog,
};
