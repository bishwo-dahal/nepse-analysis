const Router = require("express").Router();
const db = require("../../models/index.js");
const { QueryTypes, Op, json } = require("sequelize");
const errors = require("../../errors");
const { getResponse } = require("../../response");

Router.get("/", async (req, res) => {});

module.exports = Router;
