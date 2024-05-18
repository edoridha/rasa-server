"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rent.belongsTo(models.Student, { foreignKey: "studentId" });
      Rent.hasMany(models.RentBook, { foreignKey: "rentId" });
    }
  }
  Rent.init(
    {
      studentId: DataTypes.INTEGER,
      rentDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Rent",
    }
  );

  Rent.beforeCreate((rent, options) => {
    const now = new Date();
    rent.rentDate = now;
    rent.returnDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  });
  
  return Rent;
};
