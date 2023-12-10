const { Pokemon, Type } = require("../config/db");
const API_POKEMON = "https://pokeapi.co/api/v2/pokemon";
const axios = require("axios");

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
        //buscar en API ********************************

        try {
          const pokemonAPI = await axios(`${API_POKEMON}/${name}`);

          if (pokemonAPI.status === 404) throw new Error("Pokemon not found.");

          const data = pokemonAPI.data;

          if (!data.name) throw new Error('Pokemon does not exists. Try other');

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
    } else {
      //traer todos en '/'
      return await Pokemon.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
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
    return { error: error.message };
  }
};

module.exports = {
  getPokemon,
};
