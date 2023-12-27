const { Pokemon, Type } = require("../config/db");
const axios = require("axios");
const mapPokemonObject = require("./mapPokemon");

const API_POKEMON = "https://pokeapi.co/api/v2/pokemon";

//DB by name
const getPokemon = async (name, pageAt, pageLimit, source) => {
  // console.log('que es pageLimit?', pageLimit);
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
          // console.log('que es pokemonAPI???: ', pokemonAPI);
          // console.log('que es pokemonAPI y s???: ', pokemonAPI.status);
          if (pokemonAPI.status === 404) throw Error("Pokemon not found.");

          const data = pokemonAPI.data;

          if (!data.name) throw Error("Pokemon does not exists. Try other.");

          return mapPokemonObject(data); //funcion mapeadora
        } catch (error) {
          return { error: error.message };
        }
      }
    } else {
      //funcion que determina paginado
      const paginate = (pageAt = 0, pageSize = 12) => {
        //'0' por defecto
        const offset = pageAt * pageSize;
        const limit = pageSize;

        return {
          offset,
          limit,
        };
      };

      try {
        const getThemAllPokemonSource = []; //aux para concatenar fuentes

        const { offset, limit } = paginate(pageAt, pageLimit);
        console.log(offset);
        console.log(limit);

        //traer TODO en '/' ***************************************
        //retreive from PokeAPI
        try {
          const response = await axios.get(
            `${API_POKEMON}?offset=${offset}&limit=${limit}`
          ); //limite 12 (lotes de 12)
          const { results } = response.data;

          let reformattedArrayOfPokemonNames = results.map((poke) => {
            // {id: #, name: 'pokemon name'}
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
          ...paginate( pageAt, pageLimit),
        });
        // getThemAllPokemonSource.push(...myDbPokemon);
        // console.log('que esssssssssssss: ', getThemAllPokemonSource);

        // return getThemAllPokemonSource.concat(myDbPokemon);

        // if(pageAt == 107){ //107
        // return [...myDbPokemon, ...getThemAllPokemonSource];
        let booleanSource = (source === 'true');
        if(booleanSource) {
          return getThemAllPokemonSource;
        } else {
          return myDbPokemon;
        }
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
