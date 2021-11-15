const Router = require("express").Router();
const db = require("../../models/");
const errors = require("../../errors/");
const { DataTypes, Op } = require("sequelize");
Router.get("/:name", async (req, res) => {
  const companyData = await db.Company.findAll({
    where: {
      symbol: req.params.name,
    },
    raw: true,
  });
  console.log(companyData);

  res.send(companyData);
});

let validateCompany = function (company) {
  let ValidSectors = [
    "MICROFINANCE",
    "COMMERCIAL BANKS",
    "HYDRO POWER",
    "NON LIFE INSURANCE",
    "LIFE INSURANCE",
    "MANUFACTURING AND PROCESSING",
    "TRADINGS",
    "FINANCE",
    "HOTELS AND TOURISM",
    "INVESTMENT",
    "MUTUAL FUND",
    "DEVELOPMENT BANKS",
    "OTHERS",
  ];
  let validStatus = ["ACTIVE", "SUSPENDED", "DELISTED"];
  let validInstrument = [
    "EQUITY",
    "NON-CONVERTIBLE DEBENTURES",
    "MUTUAL FUNDS",
    "PREFERENCE SHARES",
  ];

  Object.values(company).forEach((comp) => {
    if (typeof comp != "string") {
      return false;
    }
  });

  if (!ValidSectors.includes(company["sector"].toUpperCase())) {
    return false;
  }
  if (!validStatus.includes(company["status"].toUpperCase())) {
    return false;
  }
  if (!validInstrument.includes(company["instrument"].toUpperCase())) {
    return false;
  }

  return true;
};
let companyFromReq = (req) => {
  return {
    symbol: req.body.symbol,
    name: req.body.name,
    status: req.body.status,
    sector: req.body.sector,
    instrument: req.body.instrument,
    website: req.body.website,
  };
};

Router.post("/post", async (req, res) => {
  let currentError = [];
  let companyReceived = companyFromReq(req);
  if (validateCompany(companyReceived)) {
    companyReceived["symbol"].toUpperCase();
    try {
      await db.Company.create(companyReceived);
    } catch (error) {
      currentError.push(errors.CREATE_NEW);
      currentError.push(error.errors[0].message);
    }
  } else {
    currentError.push(errors.company.DATA_WRONG);
  }

  if (currentError.length == 0) {
    res.status(200).send({ status: 200, result: companyReceived });
  } else {
    res.status(422).send({ status: 422, error: currentError });
  }
});
Router.put("/update/:symbol", async (req, res) => {
  let currentError = [];
  let companyReceived = companyFromReq(req);
  if (validateCompany(companyReceived)) {
    companyReceived["symbol"].toUpperCase();
    try {
      await db.Company.update(companyReceived, {
        where: {
          symbol: req.params.symbol.toUpperCase(),
        },
      });
    } catch (error) {
      currentError.push(errors.CREATE_NEW);
      currentError.push(error.errors[0].message);
    }
  } else {
    currentError.push(errors.company.DATA_WRONG);
  }

  if (currentError.length == 0) {
    res.status(200).send({ status: 200, result: companyReceived });
  } else {
    res.status(422).send({ status: 422, error: currentError });
  }
});
module.exports = Router;
