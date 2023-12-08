const { Pokemon, Type } = require("../config/db");
const API_POKEMON = "https://pokeapi.co/api/v2/pokemon";


//DB by name
const getPokemon = async (name) => {
  try {
    if (name) {
      const singlePokemon = await Pokemon.findOne({
        where: { name },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          //Type,
          model: Type,
          attributes: ["name"], //requiero solo este dato (atributo)
          through: {
            //tabla intermedia, nada
            attributes: [],
          },
        },
      });

      if (singlePokemon) {
        //se encontró
        return singlePokemon;
      } else {
        throw Error("Pokemon does not exists. Try other");
      }
    } else {
      //traer todos en '/'
      return await Pokemon.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          //Type,
          model: Type,
          attributes: ["name"], //requiero solo este dato (atributo)
          through: {
            //tabla intermedia, nada
            attributes: [],
          },
        },
      });
    }
  } catch (error) {
    return error.message;
  }
};


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

        if (pokemonAPI.status === 404) {
          throw new Error("Pokemon not founddddd.");
        }

        const data = await pokemonAPI.json();

        const mappedData = {
            id: data.id,
            name: data.name,
            hp: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
            attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
            defense: data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
            speed: data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
            height: data.height,
            weight: data.weight,
            types: data.types.map((type) => type.type.name),
            image: data.sprites.front_default,
          };

        return mappedData;

      } catch (error) {
        return { error: error.message };
      }
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getPokemon,
  getPokemonById,
};
