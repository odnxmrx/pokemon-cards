const { Router } = require('express');
const routerTypes = require('../controllers/getTypes');
const { pokemonHandler} = require('../handlers/pokemonHandler');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', routerTypes);
router.use('/pokemons', pokemonHandler);

module.exports = router;