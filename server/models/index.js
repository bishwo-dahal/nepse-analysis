"use strict";
const { Sequelize } = require("sequelize");
let db = {};
let sequelize = new Sequelize("nepse_general", "root", "" /**/, {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});
let General = sequelize.define("General", require("./General"), {
  tableName: "general",
  timestamps: false,
});

let Company = sequelize.define("Company", require("./Company"), {
  tableName: "companies",
  timestamps: false,
});
let TradedDate = sequelize.define("Traded", require("./Traded"), {
  tableName: "traded",
  timestamps: false,
});

// Company.hasMany(General);
// TradedDate.hasMany(General);

db.sequelize = sequelize;
db.General = General;
db.Company = Company;
db.Traded = TradedDate;
module.exports = db;
