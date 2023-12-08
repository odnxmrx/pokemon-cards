const { Router } = require('express');
const {Type} = require('../config/db');

const routerTypes = Router();

const typesArray = [];

fetch(`https://pokeapi.co/api/v2/type`)
.then((response) => response.json())
.then(({results}) => {
    
    for(let item of results) { 
        typesArray.push(item.name);
    }

}), (reason) => {
    console.log('la razon fue: ', reason);
}

routerTypes.post('/', async (req, res) => {
    try {
        // Arreglo de promesas - mapeo typesArray para create/find cada string (type)
        const createdTypes = await Promise.all(typesArray.map(async (typeName, idType) => {
            // Find/create the type
            const type = await Type.findOrCreate({
                where: { name: typeName, id: idType }, //que coincida con estas cols
                defaults: { name: typeName, id: idType }, // If the type doesn't exist, create it with the provided name
                order: [
                    ['id', 'ASC'] //mostrarlos ASC por su ID
                ]
            });

            return type;
        }));

        res.status(201).json(createdTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: message.error });
    }
});

//GET obtener registros - /types
routerTypes.get('/', async (req, res) => {
    try {
      const allTypes = await Type.findAll({
        attributes: ["id", "name"],
        order: [
            ['id', 'ASC']
        ]
      });
  
      res.status(200).json(allTypes);
    //   return allTypes;
  
    } catch (error) {
      res.status(400).json({error: error.message});
    //   return error;
    }
  });

module.exports = routerTypes;