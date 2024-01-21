"use strict";
const { Sequelize } = require("sequelize");
let db = {};
let sequelize = new Sequelize(
  process.env.DATABASE || "nepse_general",
  process.env.DB_USERNAME || "root",
  process.env.PASSWORD || "" /**/,
  {
    dialect: "mysql",
    host: process.env.HOST || "127.0.0.1",
    logging: console.log,
  }
);
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
