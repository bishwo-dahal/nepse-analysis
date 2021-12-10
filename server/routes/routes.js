//this file is for adding all routes to make server.js cleaner
const Router = require("express").Router();

const General = require("./general/general");
const Companies = require("./company/companies");
const Company = require("./company/company");
const Dashboard = require("./dashboard/dashboard");

Router.use("/general", General);
Router.use("/companies", Companies);
Router.use("/company", Company);
Router.use("/dashboard", Dashboard);

module.exports = Router;
