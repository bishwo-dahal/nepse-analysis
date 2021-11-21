const Router = require("express").Router();
const db = require("../../models/index.js");
const { QueryTypes, Op } = require("sequelize");
const { getResponse } = require("../../response/index.js");

Router.get("/list", async (req, res) => {
  let currentErrors = [];
  let companiesList;
  try {
    companiesList = await db.Company.findAll({ raw: true });
  } catch (error) {
    currentErrors.push(error);
  }
  res.send(getResponse(currentErrors, companiesList));
});
Router.get("/name", async (req, res) => {
  let currentErrors = [];
  let companiesName;
  try {
    companiesName = await db.Company.findAll({
      attributes: ["symbol"],
      raw: true,
    });
    companiesName = companiesName.map((company) => company.symbol);
  } catch (error) {
    currentErrors.push(error);
  }
  res.send(getResponse(currentErrors, companiesName));
});

module.exports = Router;
