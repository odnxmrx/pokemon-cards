const { Pokemon, Type } = require("../config/db");
const axios = require("axios");
const mapPokemonObject = require("./mapPokemon");

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
          as: "types", //alias: debo cambiarlo tambien en la relación (db.js)
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

          return mapPokemonObject(data); //funcion mapeadora
        } catch (error) {
          return { error: error.message };
        }
      }
    } else {
      
      const paginate = (page = 0, pageSize = 9) => { //'0' por defecto
        const offset = page * pageSize;
        const limit = pageSize;

        return {
          offset,
          limit,
        };
      };

      
      try {
        const getThemAllPokemonSource = [];

        // const page = pageAt; //initial value (hardcoriado)
        const { offset, limit } = paginate(pageAt);
        console.log(offset);
        console.log(limit);

        //traer todos en '/' ***************************************

        //retreive from PokeAPI
        // async function getPokemonBatch() {
        try {
          const response = await axios.get(`${API_POKEMON}?offset=${offset}&limit=${limit}`); //limite 9 (lotes de 9)
          const { results } = response.data;

          let reformattedArrayOfPokemonNames = results.map((poke) => {// {id: #, name: 'pokemon name'}
            var rPoke = {}; //aux obj

            //get pokemon id from 'url'
            let pokemonUrlToArray = poke.url.split("/");
            let pokemonId = pokemonUrlToArray[pokemonUrlToArray.length - 2]; //el último item está vacío

            rPoke["id"] = pokemonId;
            rPoke["name"] = poke.name; //'name' as it is

            return rPoke;
          });

          //arreglo de promesas
          const pokemonPromises = reformattedArrayOfPokemonNames.map(
            async (pokemon) => {
              return await fetchPokemonData(pokemon);
            }
          );

          const getThemAllPokemon = await Promise.all(pokemonPromises);
          
          getThemAllPokemonSource.push(...getThemAllPokemon);
        } catch (error) {
          return { error: error.message };
        }

        async function fetchPokemonData(pokemon) {
          let pokename = pokemon.name;

          const response = await axios(`${API_POKEMON}/${pokename}`);
          const data = response.data;

          let cadaPokeBien = mapPokemonObject(data);

          return cadaPokeBien;
        }

        //Retrieve from my DB
        const myDbPokemon = await Pokemon.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: {
            model: Type,
            as: "types", //alias: debo cambiarlo tambien en la relación (db.js)
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
          ...paginate(pageAt),
          // subQuery: false
        });

        // console.log('que esssssssssssss: ', getThemAllPokemonSource);
        getThemAllPokemonSource.concat(myDbPokemon);

        // return getThemAllPokemonSource.concat(myDbPokemon);

        return getThemAllPokemonSource;

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
