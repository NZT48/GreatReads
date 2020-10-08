'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  book.init({
    name: DataTypes.STRING,
    authors: DataTypes.STRING,
    published: DataTypes.DATE,
    genres: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    approved: DataTypes.BOOLEAN,
    pdf: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};