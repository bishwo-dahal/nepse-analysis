const Router = require("express").Router();
const XLSX = require("xlsx");
const { jsonCompanyData, generateQuery } = require("./function");
const db = require("../../models/index.js");
const { QueryTypes, Op } = require("sequelize");
const errors = require("../../errors");

Router.get("/html", (req, res) => {
  let currentWorkBook = XLSX.readFile("./data/share.xlsx");
  let htmlData = XLSX.utils.sheet_to_html(
    currentWorkBook.Sheets[currentWorkBook.SheetNames[0]]
  );
  res.send(htmlData);
});

Router.post("/import", async (req, res) => {
  let currentErrors = [];
  let currentWorkBook = XLSX.readFile("./data/share.xlsx");
  let jsonData = XLSX.utils.sheet_to_json(
    currentWorkBook.Sheets[currentWorkBook.SheetNames[0]]
  );
  let date = req.body.date;

  let allRequiredCompanies = [];
  try {
    allRequiredCompanies = await db.Company.findAll({
      attributes: ["symbol"],
      where: {
        status: "Active",
      },
      raw: true,
    });
  } catch (error) {
    currentErrors.push(error);
  }

  let noDataCompanies = [];
  let requiredCompanies = allRequiredCompanies.map((result) => result.symbol);
  let availableCompanies = jsonData.map((result) => result["Symbol"]);
  let extraCompanies = [];

  noDataCompanies = requiredCompanies.filter(
    (comp) => !availableCompanies.includes(comp)
  );

  extraCompanies = availableCompanies.filter(
    (comp) => !requiredCompanies.includes(comp)
  );
  //filtering companies on basis of logic

  let totalVolume = 0;
  let totalTurnOver = 0;
  jsonData.forEach((result) => {
    totalVolume += +result["Vol"];
    totalTurnOver += +result["Turnover"];
  });

  /*
  Get necessary data
  Insert  date in traded
  If new companies are added then create or update with status active instrument equity and sectors other
  If companies data are not present, get their last date data, create new data with specific values copied post data 
  */

  let tradedValues = {
    companies: availableCompanies.length,
    date,
    volume: totalVolume,
    turnover: totalTurnOver,
  };

  // for those which are added today only
  extraCompanies.forEach(async (company) => {
    let currentCompany = {
      symbol: company,
      status: "Active",
      name: company,
      sector: "Others",
      instrument: "Equity",
      website: "",
    };
    //maybe there can be better code for this
    try {
      await db.Company.create(currentCompany);
    } catch (error) {
      console.log(error);
      currentErrors.push(error[0].message);
      await db.Company.update(
        { status: "Active" },
        {
          where: {
            symbol: company,
          },
        }
      );
    }
  });

  // for those which are not available
  let lastTradedDate;
  let lastTraded;
  try {
    lastTraded = await db.Traded.findOne({
      attributes: ["date"],
      order: [["date", "DESC"]],
      raw: true,
    });
  } catch (error) {
    console.log(error);
    currentErrors.push(error);
  }
  console.log("lastTRADED = ", lastTraded);
  if (lastTraded) {
    lastTradedDate = lastTraded["date"];
  } else {
    lastTraded = true;
  }
  try {
    await db.Traded.create(tradedValues);
  } catch (error) {
    console.log(error);
    currentErrors.push("DATE " + errors.NOT_UNIQUE);
  }
  if (lastTradedDate) {
    console.log("last tradeddate is ", lastTradedDate);
    let leftData = [];
    try {
      leftData = await db.General.findAll({
        where: {
          symbol: {
            [Op.or]: noDataCompanies,
          },
          date: lastTradedDate,
        },
        raw: true,
      });
    } catch (error) {
      console.log(error);
      currentErrors.push(error[0].message);
    }

    leftData.forEach(async (res) => {
      let jsonCompany = jsonCompanyData;
      jsonCompany["symbol"] = res["symbol"];
      jsonCompany["open"] = res["open"] || 0;
      jsonCompany["high"] = res["high"] || 0;
      jsonCompany["low"] = res["low"] || 0;
      jsonCompany["close"] = res["close"] || 0;
      jsonCompany["date"] = date;
      await db.General.create(jsonCompany);
    });
  }

  if (!lastTradedDate) {
    console.log("last traded data is not found", noDataCompanies);
    noDataCompanies.forEach(async (company) => {
      let jsonCompany = jsonCompanyData;
      jsonCompany["symbol"] = company.toUpperCase();
      jsonCompany["date"] = date;
      await db.General.create(jsonCompany);
      // console.log(jsonCompany);
    });
  }
  if (currentErrors.length == 0) {
    console.log("json data reached end");
    let query = generateQuery(jsonData, date);
    try {
      await db.sequelize.query(query, { type: QueryTypes.INSERT });
    } catch (error) {
      currentErrors.push(error);
    }
    res.send({
      status: 200,
      created: extraCompanies,
      updated: noDataCompanies,
    });
  } else {
    res.status(400).send({
      status: 400,
      errors: currentErrors,
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
