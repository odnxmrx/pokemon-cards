const { Router } = require("express");
const { createPokemonDB } = require("../controllers/postPokemon");
const { getPokemon } = require("../controllers/getPokemon");
const { getPokemonById } = require("../controllers/getPokemonById");
const { deletePokemon } = require("../controllers/deletePokemon");

const pokemonHandler = Router();

//POST obj
pokemonHandler.post("/", async (req, res) => {
  const { types, name, image, hp, attack, defense, speed, height, weight } =
    req.body;

  try {
    if (![name, image, hp, attack, defense, types].every(Boolean)) throw Error("Missing required data.");
    
    // Validar 'types' sea array
    //si no viene en formato ["", ""]; no pasa
    if (!Array.isArray(types)) throw Error("'Types' should be an array.");
    
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

//PUT by params :id
// pokemonHandler.put("/:id", async (req, res) => {

//   const { id } = req.params;

//   try {
    
//   } catch (error) {
    
//   }

// })


//DELETE by params :id
pokemonHandler.delete("/:id", async (req, res) => {

  const { id } = req.params;
  try {
    console.log('obtuve id?????? ', id);
    if(id.length < 8) throw Error('You can delete only Pokemons from DB.')

    const deletedPokemon = await deletePokemon(id);

    res.status(200).json(deletedPokemon);

  } catch (error) {
    res.status(404).json({error: error.message});
  }

})

module.exports = {
  pokemonHandler,
};
