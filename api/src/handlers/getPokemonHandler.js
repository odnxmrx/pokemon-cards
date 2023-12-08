const { getPokemon } = require("../controllers/getPokemonController");


// GET by query - ?name=
const getPokemonHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      let pokemonName = name.toLowerCase(); //lo necesito así

      const singlePokemon = await getPokemon(pokemonName);

      res.status(200).json(singlePokemon);
    } else { // cuando no haya query; traer todos en '/'
      
      const allPokemons = await getPokemon();

      res.status(200).json(allPokemons);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getPokemonHandler;
