let { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize("nepse-analysis", "root", "" /*password*/, {
  host: "localhost",
  dialect: "mysql",
});
