'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  comments.init({
    book: DataTypes.STRING,
    author: DataTypes.STRING,
    bookAuthors: DataTypes.STRING,
    description: DataTypes.TEXT,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};