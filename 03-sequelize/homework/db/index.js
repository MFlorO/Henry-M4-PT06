const { Sequelize, Op } = require('sequelize');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

const db = new Sequelize('postgres://postgres:2661@localhost:5432/henry_sequelize', { //Conectando a la BD
  logging: false, //Me evita todo el texto de conexion
});

modelCharacter(db);
modelAbility(db);
modelRole(db);


//db.models = {Character,Ability,Role}

module.exports = {
  ...db.models,
  db,
  Op
}