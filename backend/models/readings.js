'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class readings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  readings.init({
    bookname: DataTypes.STRING,
    readername: DataTypes.STRING,
    toread: DataTypes.BOOLEAN,
    finished: DataTypes.BOOLEAN,
    current: DataTypes.INTEGER,
    pages: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'readings',
  });
  return readings;
};