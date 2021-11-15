const Router = require("express").Router();
const db = require("../../models/");
const errors = require("../../errors/");
const { DataTypes, Op } = require("sequelize");

const { validateCompany, companyFromReq } = require("./function");

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
    res.status(422).send({ status: 422, errors: currentError });
  }
});
module.exports = Router;
