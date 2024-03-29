const Router = require("express").Router();
const XLSX = require("xlsx");
const {
  jsonCompanyData,
  generateQuery,
  allCompanies,
  validateExcel,
  percentageDifference,
} = require("./function");
const db = require("../../models/index.js");
const { QueryTypes, Op, json } = require("sequelize");
const errors = require("../../errors");
const { getResponse } = require("../../response");

Router.get("/html", (req, res) => {
  let currentWorkBook = XLSX.readFile("./data/share.xlsx");
  let htmlData = XLSX.utils.sheet_to_html(
    currentWorkBook.Sheets[currentWorkBook.SheetNames[0]]
  );
  res.send(htmlData);
});
Router.get("/tradedDate", async (req, res) => {
  let noOfDate = 5;
  let currentErrors = [];
  let result;
  try {
    if (+req.query.l < 10) {
      noOfDate = +req.query.l;
    } else {
      noOfDate = 5;
    }
    result = await db.Traded.findAll({
      attributes: ["date"],
      order: [["date", "DESC"]],
      limit: noOfDate,
    });
    result = result.map((res) => res.date);
  } catch (error) {
    currentErrors.push("can't fetch data");
  }
  if (currentErrors.length == 0) {
    res.status(200).send({
      status: 200,
      result,
    });
  } else {
    res.send({
      status: 400,
      errors: currentErrors,
    });
  }
});

let lastSpecifiedData = async (dates) => {
  return await db.General.findAll({
    attributes: ["date", "symbol", "open", "close", "high", "low", "vol"],
    where: {
      date: {
        [Op.or]: dates,
      },
    },
    order: [
      ["symbol", "ASC"],
      ["date", "DESC"],
    ],
    raw: true,
  });
};

Router.get("/validate", async (req, res) => {
  let currentWorkBook = XLSX.readFile("./data/share.xlsx");
  let jsonData = XLSX.utils.sheet_to_json(
    currentWorkBook.Sheets[currentWorkBook.SheetNames[0]]
  );
  let currentErrors = [];

  let validation = validateExcel(jsonData);
  if (validation === false) {
    currentErrors.push("There are either more data or invalid data");
  }
  res.send(getResponse(currentErrors, true));
});

Router.get("/today-summary", async (req, res) => {
  let currentErrors = [];
  let result = { turnover: 0, volume: 0, traded: 0 };
  let currentWorkBook = XLSX.readFile("./data/share.xlsx");
  let jsonData = XLSX.utils.sheet_to_json(
    currentWorkBook.Sheets[currentWorkBook.SheetNames[0]]
  );
  let totalVolume = 0;
  let totalTurnOver = 0;
  let totalCompany = jsonData.length;
  jsonData.forEach((result) => {
    totalVolume += +result["Vol"];
    totalTurnOver += +result["Turnover"];
  });
  result.turnover = totalTurnOver;
  result.volume = totalVolume;
  result.traded = totalCompany;
  res.send(getResponse([], result));
});

Router.post("/import", async (req, res) => {
  let currentErrors = [];
  let currentWorkBook = XLSX.readFile("./data/share.xlsx");
  let jsonData = XLSX.utils.sheet_to_json(
    currentWorkBook.Sheets[currentWorkBook.SheetNames[0]]
  );
  let date = req.body.date;

  let extraCompanies = [];
  let noDataCompanies = [];

  if (validateExcel(jsonData)) {
    try {
      let allRequiredCompanies = await db.Company.findAll({
        attributes: ["symbol"],
        where: {
          status: "Active",
        },
        raw: true,
      });
      let requiredCompanies = allRequiredCompanies.map(
        (result) => result.symbol
      );
      let availableCompanies = jsonData.map((result) => result["Symbol"]);

      noDataCompanies = requiredCompanies.filter(
        (comp) => !availableCompanies.includes(comp)
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
      extraCompanies = availableCompanies.filter((comp) => {
        console.log(comp);
        return !requiredCompanies.includes(comp);
      });
      console.log(availableCompanies, requiredCompanies, extraCompanies);
      extraCompanies.forEach(async (company) => {
        console.log("company name is ", company);
        let currentCompany = {
          symbol: company,
          status: "Active",
          name: company,
          sector: "Others",
          instrument: "Equity",
          website: "",
        };
        //maybe there can be better code for this

        await db.Company.create(currentCompany);

        await db.Company.update(
          { status: "Active" },
          {
            where: {
              symbol: company,
            },
          }
        );
      });
      // for those which are not available
      let lastTradedDate;
      let lastTraded;

      lastTraded = await db.Traded.findOne({
        attributes: ["date"],
        order: [["date", "DESC"]],
        raw: true,
      });

      console.log("lastTRADED = ", lastTraded);
      if (lastTraded) {
        lastTradedDate = lastTraded["date"];
      } else {
        lastTraded = true;
      }

      await db.Traded.create(tradedValues);

      if (lastTradedDate) {
        console.log("last tradeddate is ", lastTradedDate);
        let leftData = [];
        leftData = await db.General.findAll({
          where: {
            symbol: {
              [Op.or]: noDataCompanies,
            },
            date: lastTradedDate,
          },
          raw: true,
        });
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
      console.log("json data reached end");
      let query = generateQuery(jsonData, date);
      await db.sequelize.query(query, {
        type: QueryTypes.INSERT,
        logging: false,
      });
    } catch (error) {
      console.log(error);
      currentErrors.push(error);
    }
  }

  if (currentErrors.length == 0) {
    res.send({
      status: 200,
      created: extraCompanies,
      updated: noDataCompanies,
    });
  } else {
    res.send({
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

      if (res.open == 0) {
        currentData.open = 0;
      } else {
        currentData.open = (
          ((matchedData.open - res.open) / res.open) *
          100
        ).toFixed(2);
      }
      if (res.close == 0) {
        currentData.close = 0;
      } else {
        currentData.close = (
          ((matchedData.close - res.close) / res.close) *
          100
        ).toFixed(2);
      }
      if (res.high == 0) {
        currentData.high = 0;
      } else {
        currentData.high = (
          ((matchedData.high - res.high) / res.high) *
          100
        ).toFixed(2);
      }

      if (res.low == 0) {
        currentData.low = 0;
      } else {
        currentData.low = (
          ((matchedData.low - res.low) / res.low) *
          100
        ).toFixed(2);
      }
      if (res.vol == 0) {
        currentData.vol = 0;
        if (matchedData.vol != 0) currentData.vol = 100;
      } else {
        currentData.vol = (
          ((matchedData.vol - res.vol) / res.vol) *
          100
        ).toFixed(2);
      }

      data.push(currentData);
    }
  });

  res.status(200).send({
    status: 200,
    data,
  });
});

Router.get("/compare-weekly", async (req, res) => {
  let currentErrors = [];
  let result = { dates: [], values: {} };

  try {
    let lastSeven = await db.Traded.findAll({
      order: [["date", "DESC"]],
      raw: true,
      limit: 7,
    });
    let lastSevenDate = lastSeven.map((date) => date.date);
    result.dates = lastSevenDate;
    let companies = await allCompanies();
    let lastSevenResult = await lastSpecifiedData(lastSevenDate);
    for (const company of companies) {
      let filteredCompany = lastSevenResult.filter(
        (data) => data.symbol == company
      );
      result.values[company] = [];
      result.values[company].push(...filteredCompany);
    }
  } catch (error) {
    console.log(error);
    currentErrors.push(error);
  }
  res.send(getResponse(currentErrors, result));
});

Router.get("/compare-weekly-percent", async (req, res) => {
  let currentErrors = [];
  let result = { dates: [], values: {} };
  try {
    let lastEight = await db.Traded.findAll({
      order: [["date", "DESC"]],
      raw: true,
      limit: 8, // it is sufficient for comparing 7 datas.
    });
    let lastEightDate = lastEight.map((date) => date.date);
    result.dates = lastEightDate;
    let companies = await allCompanies();
    let lastEightResult = await lastSpecifiedData(lastEightDate);
    for (const company of companies) {
      let filteredCompany = lastEightResult.filter(
        (data) => data.symbol == company
      );
      let finalFilteredCompany = [];

      for (let ctr = 0; ctr < filteredCompany.length - 1; ctr++) {
        const current = filteredCompany[ctr];
        const next = filteredCompany[ctr + 1];
        let currentCompare = {
          date: `${current.date}-${next.date}`,
          symbol: current.symbol,
          open: percentageDifference(current.open, next.open),
          close: percentageDifference(current.close, next.close),
          high: percentageDifference(current.high, next.high),
          low: percentageDifference(current.low, next.low),
          vol: percentageDifference(current.vol, next.vol),
        };
        finalFilteredCompany.push(currentCompare);
      }

      result.values[company] = [];
      result.values[company].push(...finalFilteredCompany);
    }
  } catch (error) {
    console.log(error);
    currentErrors.push(error);
  }
  res.send(getResponse(currentErrors, result));
});

Router.delete("/last-traded", async (req, res) => {
  let currentErrors = [];
  let result = { date: "" };
  try {
    let lastTraded = await db.Traded.findOne({
      attributes: ["date"],
      order: [["date", "DESC"]],
      raw: true,
    });
    if (lastTraded) {
      let lastDate = lastTraded.date;
      result.date = lastDate;
      await db.General.destroy({
        where: {
          date: lastDate,
        },
      });
      await db.Traded.destroy({
        where: {
          date: lastDate,
        },
      });
    }
  } catch (error) {
    console.log(error);
    currentErrors.push(error);
  }

  res.send(getResponse(currentErrors, result));
});
module.exports = Router;

/*
Format for /compare-weekly
  "ABC":[
    {
      date:1,
      open:100,
      close:200
    },
    {
      date:2,
      open:150,
      close:250
    }
  ]
  */
