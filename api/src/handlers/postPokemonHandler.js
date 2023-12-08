const { createPokemonDB } = require("../controllers/postPokemon");

const createPokemonHandler = async (req, res) => {
    const { types, name, hp, attack, defense, speed, height, weight } = req.body;

    try {

        // Validar 'types' sea array
        if (!Array.isArray(types)) { //si no viene en formato ["", ""]; no pasa
            return res.status(400).json({ error: 'Types should be an array.' });
        }

        const response = await createPokemonDB(types, name, hp, attack, defense, speed, height, weight);

        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createPokemonHandler
}