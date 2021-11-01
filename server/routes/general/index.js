const Router = require("express").Router();
const XLSX = require("xlsx");
const { generateQuery } = require("./function");
const db = require("../../models/index.js");
const { QueryTypes } = require("sequelize");

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
  } catch (err) {
    res.send({
      status: 400,
      message: "there is problem in query Contact DEVELOPER",
    });
  }
  res.send({
    status: 200,
  });
});

module.exports = Router;
