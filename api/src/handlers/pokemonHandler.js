const { Router } = require("express");
const { createPokemonDB } = require("../controllers/postPokemon");
const { getPokemon } = require("../controllers/getPokemon");
const { getPokemonById } = require("../controllers/getPokemonById");

const pokemonHandler = Router();

//POST obj
pokemonHandler.post("/", async (req, res) => {
  const { types, name, image, hp, attack, defense, speed, height, weight } =
    req.body;

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
  const { name, page, limit, source } = req.query;
  let pokemonName;

  try {
    if (name) {
      pokemonName = name.toLowerCase(); //lo necesito así
    }
    const singlePokemon = await getPokemon(pokemonName, page, limit, source);
    // console.log('que es singlePokemon??? ', singlePokemon);
    res.json(singlePokemon);
  } catch (error) {
    res.status(400).json({ error: error.response.data });
  }
});

// GET by dynamic ID - :id
pokemonHandler.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let pokemonById = await getPokemonById(id);
    res.status(200).json(pokemonById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  pokemonHandler,
};
