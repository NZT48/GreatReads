'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userInEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userInEvent.init({
    event: DataTypes.STRING,
    user: DataTypes.STRING,
    accepted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'userInEvent',
  });
  return userInEvent;
};