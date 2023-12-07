const { Router } = require('express');
const {Pokemon, Type} = require('../config/db.js');

const routerPostPokemon = Router();

//POST crear registro - /pokemons
routerPostPokemon.post('/', async (req, res) => {
    // res.send('testeo POST /pokemon')
    try {
      const { types, name, hp, attack, defense, speed, height, weight } = req.body;
      // name = name.toLowerCase();
  
      // Validar 'types' sea array
      if (!Array.isArray(types)) {
        return res.status(400).json({ error: 'Types should be an array.' });
      }

      const newPok = await Pokemon.create({ name, hp, attack, defense, speed, height, weight})
  
      //RELACION registro Pokemon' con la tabla 'Type'
      // // Find the Type associated with the provided type name
      // const typeInstance = await Type.findOne({
      //   where: { name: type },
      // });
  
      // if (typeInstance) {
  
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
        return res.status(400).json({error: 'Pokemon type(s) must be existing one.'})
      }


      if (typeInstances.length > 0) {
  
        // Relacionar Pokemon con los 'Types' encontrados
        await newPok.addType(typeInstances);
        res.status(201).json(newPok);
  
      } else {
        // En caso de que el 'type' no exista
        res.status(404).json({ error: 'Type not found.' });
      }
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  })

  module.exports = routerPostPokemon;