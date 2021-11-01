"use strict";
const { Sequelize } = require("sequelize");
let db = {};
let sequelize = new Sequelize("nepse_general", "root", "" /**/, {
  dialect: "mysql",
  host: "localhost",
});
let General = sequelize.define("General", require("./General"), {
  tableName: "general",
  timestamps: false,
});
db.sequelize = sequelize;
db.General = General;

module.exports = db;
