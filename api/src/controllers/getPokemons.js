const { Router } = require('express');
const {Pokemon, Type} = require('../config/db.js');

const routerGetPokemons = Router();

// //GET obtener registros - /pokemons
// routerGetPokemons.get('/pokemons', async (req, res) => {
//   try {
//     const allPokemons = await Pokemon.findAll();

//     res.status(200).json(allPokemons);

//   } catch (error) {
//     res.status(400).json({error: error.message});
//   }
// })

//GET obtener registros x query - /pokemons/?name=''
routerGetPokemons.get('/', async (req, res) => {
    try {
      const { name } = req.query;
  
      if(name) {
        let pokemonName = name.toLowerCase(); //lo necesito así
        const singlePokemon = await Pokemon.findOne({
          where: { name: pokemonName},
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        })
        
        if(!pokemonName) {
          res.status(400).json({error: 'Pokemon does not exists. Try other'});
        } else {
          res.status(200).json(singlePokemon);
        }
  
      } else { //traer todos en '/'
        const allPokemons = await Pokemon.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: { //Type,
            model: Type,
            attributes: ["name"], //requiero solo este dato (atributo)
            through: { //tabla intermedia, nada
              attributes: [],
            }
          }
        });
  
        res.status(200).json(allPokemons);
      }
  
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  })
  
  //GET obtener registros x params - /pokemons/:idPokemon
  routerGetPokemons.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const singlePokemon = await Pokemon.findByPk(id);
  
      res.json(singlePokemon);
  
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  })

module.exports = routerGetPokemons;