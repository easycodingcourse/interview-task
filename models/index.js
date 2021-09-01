'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const host = process.env.DB_HOST
const database = process.env.DB_NAME
const user = process.env.DB_USER
const password = process.env.DB_PASS
const db = {};
let sequelize;


 sequelize = new Sequelize(database,user,password, {
  host,
  dialect: 'postgres',
  logging:false
});



fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



// sequelize.sync({ force: false });


module.exports = db;
