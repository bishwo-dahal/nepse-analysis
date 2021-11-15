//this file is for adding all routes to make server.js cleaner
const Router = require("express").Router();

const General = require("./general/general");
const Companies = require("./company/companies");
const Company = require("./company/company");

Router.use("/general", General);
Router.use("/companies", Companies);
Router.use("/company", Company);

module.exports = Router;
