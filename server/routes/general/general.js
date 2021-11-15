const Router = require("express").Router();
const XLSX = require("xlsx");
const { generateQuery } = require("./function");
const db = require("../../models/index.js");
const { QueryTypes, Op } = require("sequelize");

Router.get("/html", (req, res) => {
  let currentWorkBook = XLSX.readFile("./data/share.xlsx");
  let htmlData = XLSX.utils.sheet_to_html(
    currentWorkBook.Sheets[currentWorkBook.SheetNames[0]]
  );
  res.send(htmlData);
});
Router.post("/import", async (req, res) => {
  let currentWorkBook = XLSX.readFile("./data/share.xlsx");
  let jsonData = XLSX.utils.sheet_to_json(
    currentWorkBook.Sheets[currentWorkBook.SheetNames[0]]
  );
  let date = req.body.date;
  let query = generateQuery(jsonData, date);
  try {
    await db.sequelize.query(query, { type: QueryTypes.INSERT });
    res.send({
      status: 200,
    });
  } catch (err) {
    res.send({
      status: 400,
      message:
        "there is problem in query or Database connection Contact DEVELOPER" +
        err,
    });
  }
});

Router.get("/compare-percent", async (req, res) => {
  let initial = req.query.initial;
  let final = req.query.final;
  if (typeof initial == "undefined" || typeof final == "undefined") {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    final = today.toISOString().slice(0, 10);
    initial = yesterday.toISOString().slice(0, 10);
  }

  let initialSQLData = await db.General.findAll({
    attributes: ["symbol", "date", "open", "high", "low", "close", "vol"],
    where: {
      date: {
        [Op.eq]: initial,
      },
    },
  });
  let finalSQLData = await db.General.findAll({
    attributes: ["symbol", "date", "open", "high", "low", "close", "vol"],
    where: {
      date: final,
    },
  });

  let initialData = initialSQLData.map((result) => result.dataValues);
  let finalData = finalSQLData.map((result) => result.dataValues);
  let data = [];
  initialData.forEach((res) => {
    let matchedData = finalData.find((val) => res.symbol == val.symbol);
    if (matchedData) {
      let currentData = {};
      currentData["symbol"] = matchedData.symbol;
      currentData.open = (
        ((matchedData.open - res.open) / res.open) *
        100
      ).toFixed(2);
      currentData.close = (
        ((matchedData.close - res.close) / res.close) *
        100
      ).toFixed(2);
      currentData.high = (
        ((matchedData.high - res.high) / res.high) *
        100
      ).toFixed(2);
      currentData.low = (((matchedData.low - res.low) / res.low) * 100).toFixed(
        2
      );
      currentData.vol = (((matchedData.vol - res.vol) / res.vol) * 100).toFixed(
        2
      );
      console.log(currentData);
      data.push(currentData);
    }
  });

  res.status(200).send({
    status: 200,
    data,
  });
});

module.exports = Router;
