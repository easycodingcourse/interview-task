'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
 
    }
  };
  Users.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profile: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    jwt: {
      type: DataTypes.ARRAY(Sequelize.TEXT)
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName:'users',
    paranoid:true
  });
  return Users;
};