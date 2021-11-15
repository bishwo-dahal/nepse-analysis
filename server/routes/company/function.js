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

module.exports = {
  companyFromReq,
  validateCompany,
};
