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

let Company = sequelize.define("Company", require("./Company"), {
  tableName: "companies",
  timestamps: false,
});
Company.hasMany(General);
let TradedDate = sequelize.define("Traded", require("./TradedDate"), {
  tableName: "traded_date",
  timestamps: false,
});
db.sequelize = sequelize;
db.General = General;
db.Company = Company;
db.TradedDate = TradedDate;
module.exports = db;
