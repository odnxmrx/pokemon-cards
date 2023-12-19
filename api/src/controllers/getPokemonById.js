const { Pokemon, Type } = require("../config/db");
const API_POKEMON = "https://pokeapi.co/api/v2/pokemon";
const mapPokemonObject = require("./mapPokemon");

//GET DB || API - by ID
const getPokemonById = async (id) => {
    try {
      //Debe funcionar tanto para los pokemones de la API como para los de la base de datos.
      if (id.length > 8) {
        //toca buscar en mi DB
        let pokemonDB = await Pokemon.findByPk(id, {
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: {
            //Type,
            model: Type,
            as: 'types', //alias: debo cambiarlo tambien en la relación (db.js)
            attributes: ["name"], //requiero solo este dato (atributo)
            through: {
              //tabla intermedia, nada
              attributes: [],
            },
          },
        });
  
        return pokemonDB === null ? { error: "Pokemon not found." } : pokemonDB;
      } else {
        //buscar en API ********************************
        try {
          const pokemonAPI = await fetch(`${API_POKEMON}/${id}`);
  
          if (pokemonAPI.status === 404) throw new Error("Pokemon not found.");
          
          const data = await pokemonAPI.json(); //porque 'fetch'
  
          return mapPokemonObject(data); //funcion mapeadora
  
        } catch (error) {
          return { error: error.message };
        }
      }
    } catch (error) {
      return error.message;
    }
  };
  
  module.exports = {
    getPokemonById,
  };
  