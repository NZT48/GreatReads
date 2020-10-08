'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  events.init({
    name: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,
    author: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};