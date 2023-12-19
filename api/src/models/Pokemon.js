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
          if(value < 0 || value > 255) throw Error('HP value surpases limits.')
        }
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [0,180]
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [0,230],
    }, 
    speed: {
      type: DataTypes.INTEGER,
      len: [0,180]
    },
    height: {
      type: DataTypes.INTEGER,
      len: [0,20],
    },
    weight: {
      type: DataTypes.INTEGER,
      len: [0,400]
    }
  });
};

module.exports = Pokemon;