const { Pokemon, Type } = require("../config/db");
const axios = require("axios");

const API_POKEMON = "https://pokeapi.co/api/v2/pokemon";

//DB by name
const getPokemon = async (name, pageAt) => {
  try {
    if (name) {
      const singlePokemon = await Pokemon.findOne({
        where: { name },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Type,
          as: 'types', //alias: debo cambiarlo tambien en la relación (db.js)
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

          if (!data.name) throw new Error("Pokemon does not exists. Try other");

          const mappedData = {
            id: data.id,
            name: data.name,
            hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
            attack: data.stats.find((stat) => stat.stat.name === "attack")
              .base_stat,
            defense: data.stats.find((stat) => stat.stat.name === "defense")
              .base_stat,
            speed: data.stats.find((stat) => stat.stat.name === "speed")
              .base_stat,
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

      const paginate = (page = 0) => { //'0' por defecto
        const limit = 3;
        const offset = page * limit;

        return {
          offset,
          limit,
        };
      };

      try {
        const page = pageAt; //initial value (hardcoriado)

        // const { offset, limit } = paginate(page);

        //traer todos en '/'
        return await Pokemon.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: {
            model: Type,
            as: 'types', //alias: debo cambiarlo tambien en la relación (db.js)
            attributes: ["name"], //requiero solo este dato (atributo)
            through: {
              //tabla intermedia, nada
              attributes: [],
            },
          },
          // order: [
          //   ['name', 'ASC'] //mostrarlos ASC por su ID
          // ],
          // offset: 0, limit: 9, //Intentando paginacion
          ...paginate(page),
          // subQuery: false
        });
      } catch (error) {
        return { error: error.message };
      }
    }
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  getPokemon,
};
