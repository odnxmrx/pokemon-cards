const { Router } = require('express');
const routerTypes = require('../controllers/getTypes');
// const {createPokemonDB} = require('../controllers/postPokemon');
const routerGetPokemons = require('../controllers/getPokemons');
const { createPokemonHandler } = require('../handlers/postPokemonHandler');
const {getPokemonHandler, getPokemonByIdHandler } = require('../handlers/getPokemonHandler');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', routerTypes);
router.post('/pokemons', createPokemonHandler);
router.get('/pokemons', getPokemonHandler);
router.get('/pokemons/:id', getPokemonByIdHandler);

module.exports = router;