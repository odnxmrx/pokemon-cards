const { Router } = require('express');
const routerTypes = require('../controllers/getTypes');
const routerPostPokemon = require('../controllers/postPokemon');
const routerGetPokemons = require('../controllers/getPokemons');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', routerTypes);
router.use('/pokemons', routerPostPokemon);
router.use('/pokemons', routerGetPokemons);

module.exports = router;
