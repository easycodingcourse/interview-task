'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    
    static associate({Discounts,SubCategorys}) {
      Products.belongsTo(Discounts, { foreignKey: 'discountId', as: "productDiscount" })
      Products.belongsTo(SubCategorys, { foreignKey: 'subCategoryId', as: "subCategory" })
    }
  };
  Products.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productImages: {
      type: DataTypes.ARRAY(Sequelize.STRING)
    },
    description: {
      type: DataTypes.TEXT
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.DOUBLE(20, 2),
      comment: "Actual selling price",
      allowNull: false
    },
    msrp: {
      type: DataTypes.DOUBLE(20, 2),
      comment: "Manufacturer's suggested retail price (MSRP) or MRP - Maximum retail price",
      allowNull: false
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discountId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: 1,
      comment: '0=pending,1=active,2=cancel'
    }
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'products',
    paranoid: true
  });
  return Products;
};