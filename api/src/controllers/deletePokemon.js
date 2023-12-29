const { Pokemon, Type } = require("../config/db");

const deletePokemon = async (id) => {
    try {
        // console.log('obtuve id?????? ', id);
        if(id.length < 8) throw Error('You can delete only Pokemons from DB.')
    
        const deletedPokemon = await Pokemon.findByPk(id);
        // console.log('quessss deletepokemon???? ', deletePokemon);
        deletedPokemon.destroy();
    
        return `Pokemon ${deletedPokemon.name} was deleted.`;
    
      } catch (error) {
        return {error: error.message};
      }
    
}

module.exports = {
    deletePokemon,
}