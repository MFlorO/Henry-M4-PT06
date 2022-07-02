const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type:  DataTypes.STRING,
      unique: 'compositeUnique',
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    mana_cost: {
      type: DataTypes.FLOAT, 
      unique: 'compositeUnique',
      allowNull: false,
    }
  })
}
