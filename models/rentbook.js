"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RentBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RentBook.belongsTo(models.Rent, { foreignKey: "rentId" });
      RentBook.belongsTo(models.Book, { foreignKey: "bookId" });
    }
  }
  RentBook.init(
    {
      rentId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RentBook",
    }
  );
  return RentBook;
};
