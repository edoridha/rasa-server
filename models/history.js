'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.Student, {foreignKey: "studentId"})
      History.belongsTo(models.Book, {foreignKey: "bookId"})
    }
  }
  History.init({
    studentId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    rentDate: DataTypes.DATE,
    returnDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};