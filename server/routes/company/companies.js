const Router = require("express").Router();
const db = require("../../models/index.js");
const { QueryTypes, Op } = require("sequelize");

Router.get("/list", async (req, res) => {
  let companiesList = await db.Company.findAll({ raw: true });
  res.send(companiesList);
});

module.exports = Router;
