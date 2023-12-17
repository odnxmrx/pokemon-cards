const {Pokemon, Type} = require('../config/db.js');

const createPokemonDB = async (types, name, image, hp, attack, defense, speed, height, weight) => {
  try {
    //RELACION registro Pokemon' con la tabla 'Type'
    // Find the Types associated with the provided type names
    const typeInstances = await Type.findAll({
        where: { name: types,
          // validate: {
          //   len: types.length,
          //   notEmpty: true 
          // }
        }
        
      });
      
      //validar que existan en tabla Type
      // console.log(typeInstances.every(type => type instanceof Type)); //booleano
      if(typeInstances.length !== types.length) {
        return 'Pokemon type(s) must be existing one.';
      }

      const newPok = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight})
      
      if (typeInstances.length > 0) { // Relacionar Pokemon con los 'Types' encontrados
        await newPok.addType(typeInstances);
        return newPok;
  
      } else {
        // En caso de que el 'type' no exista
        return 'no esiste tipo.'
      }
  } catch (error) {
    // res.status(404).json({ error: error.message });
    return error.message;
  }
}

  module.exports = {
    createPokemonDB,
  };