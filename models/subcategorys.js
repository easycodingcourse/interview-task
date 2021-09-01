'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class SubCategorys extends Model {
    static associate({ Categorys,Discounts }) {
      SubCategorys.belongsTo(Categorys, { foreignKey: 'categoryId',as:"category" })
      SubCategorys.belongsTo(Discounts, { foreignKey: 'discountId',as:"subCategoryDiscount" })
    }
  };
  SubCategorys.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '0=disable,1=enable'
    },
    categoryId: {
      type: DataTypes.INTEGER
    },
    discountId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'SubCategorys',
    tableName: 'subCategory',
    paranoid: true
  });
  return SubCategorys;
};