const { Router } = require("express");
const { createPokemonDB } = require("../controllers/postPokemon");
const { getPokemon } = require("../controllers/getPokemon");
const { getPokemonById } = require('../controllers/getPokemonById');

const pokemonHandler = Router();

//POST obj
pokemonHandler.post("/", async (req, res) => {
  const { types, name, image, hp, attack, defense, speed, height, weight } = req.body;

  try {
    // Validar 'types' sea array
    //si no viene en formato ["", ""]; no pasa
    if (!Array.isArray(types)) throw Error("'Types' should be an array.");
    if (![name, hp, attack, defense].every(Boolean)) throw Error("Missing required data.");
    pokemonName = name.toLowerCase(); //lo necesito así
    
    const response = await createPokemonDB(
      types,
      pokemonName,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET by query - ?name=
pokemonHandler.get("/", async (req, res) => {
  const { name, page } = req.query;
  let pokemonName;

  try {
    if (name) {
      pokemonName = name.toLowerCase(); //lo necesito así
    }
    const singlePokemon = await getPokemon(pokemonName, page);

    res.status(200).json(singlePokemon);
    // else  { // cuando no haya query; traer todos en '/'
    //     const allPokemons = await getPokemon();
    //     res.status(200).json(allPokemons);
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET by dynamic ID - :id
pokemonHandler.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let pokemonById = await getPokemonById(id);
    res.status(200).json(pokemonById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

module.exports = {
  pokemonHandler,
};