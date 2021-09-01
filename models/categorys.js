'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorys extends Model {
    
    static associate({SubCategorys,Discounts}) {
      Categorys.hasMany(SubCategorys,{foreignKey: 'categoryId'})
      Categorys.belongsTo(Discounts, { foreignKey: 'discountId',as:"categoryDiscount" })
    }
  };
  Categorys.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:1,
      comment:'0=disable,1=enable'
    },
    discountId:{
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Categorys',
    tableName: 'categorys',
    paranoid:true
  });
  return Categorys;
};