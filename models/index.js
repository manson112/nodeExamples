"use strict";

const fs = require('fs');
const path = require('path');
const env  = process.env.NODE_ENV || "development";
const config = require('../config/config.json');
const Sequelize = require('sequelize');
let db = {};

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    config.development.option
);
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to Connection to the database: ', err);
    });

fs.readdirSync(__dirname)
    .filter(function(file){
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file){
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
Object.keys(db).forEach(function(modelName) {
    if("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;