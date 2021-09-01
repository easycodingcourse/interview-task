'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discounts extends Model {
    
    static associate(models) {
      Discounts.hasMany(models.Products,{foreignKey: 'discountId'})
    }
  };
  Discounts.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
    },
    discountPercentage:{
      type: DataTypes.DOUBLE(20,2),
      allowNull:false
    },
    startingDate:{
      type: DataTypes.DATE,
      allowNull:false
    },
    expiryDate:{
      type: DataTypes.DATE,
      allowNull:false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:1,
      comment:'0=disable,1=enable'
    },
  }, {
    sequelize,
    modelName: 'Discounts',
    tableName:'discounts',
    paranoid:true
  });
  return Discounts;
};