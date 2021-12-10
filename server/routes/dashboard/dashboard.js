const Router = require("express").Router();
const db = require("../../models/index.js");
const errors = require("../../errors");
const { getResponse } = require("../../response");

Router.get("/", async (req, res) => {
  let currentErrors = [];
  let result = {};
  try {
    let tradedInfo = await db.Traded.findAll({
      raw: true,
      attributes: { exclude: ["s_no"] },
    });

    result = tradedInfo;
  } catch (error) {
    currentErrors.push(error);
  }
  res.send(getResponse(currentErrors, result));
});

module.exports = Router;
