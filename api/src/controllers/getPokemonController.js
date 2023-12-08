const { Pokemon, Type } = require("../config/db");

const getPokemon = async (name) => {
  try {
    if (name) {
      const singlePokemon = await Pokemon.findOne({
        where: { name },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (singlePokemon) { //se encontró
        return singlePokemon;
      } else {
        throw Error("Pokemon does not exists. Try other");
      }
    } else { //traer todos en '/'
      return await Pokemon.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: { //Type,
          model: Type,
          attributes: ["name"], //requiero solo este dato (atributo)
          through: { //tabla intermedia, nada
            attributes: [],
          },
        },
      });
    }
  } catch (error) {
    return error.message;
  }
};

// //GET obtener registros x params - /pokemons/:idPokemon
// routerGetPokemon.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const singlePokemon = await Pokemon.findByPk(id);

//     res.json(singlePokemon);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

module.exports = {
    getPokemon
};
