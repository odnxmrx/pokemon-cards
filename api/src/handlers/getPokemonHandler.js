const {
  getPokemon,
  getPokemonById,
} = require("../controllers/getPokemonController");

// GET by query - ?name=
const getPokemonHandler = async (req, res) => {
  const { name } = req.query;
  let pokemonName;

  try {
    if (name) {
      pokemonName = name.toLowerCase(); //lo necesito así
    }
    const singlePokemon = await getPokemon(pokemonName);

    res.json(singlePokemon);
    // else  { // cuando no haya query; traer todos en '/'
    //     const allPokemons = await getPokemon();
    //     res.status(200).json(allPokemons);
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET by dynamic ID - :id
const getPokemonByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    let pokemonById = await getPokemonById(id);
    res.status(200).json(pokemonById);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonHandler,
  getPokemonByIdHandler,
};
