const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Pokemon = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      //isUUID: 4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING, // <- type for image ( database :postgresql )
      allowNull: false,
    },
    hp: { //hp es vida (está en: stats- 0 - stats - name: 'hp')
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        myValidator(value) {
          if(value < 0 || value > 300) throw Error('HP value surpases limits.')
        }
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [0,250]
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER
    }
  });
};

module.exports = Pokemon;