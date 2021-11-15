let validateData = (data) => {
  Object.entries(data).forEach((result) => {
    if (data[result[0]] == "-" || typeof data[result[0]] == "undefined") {
      data[result[0]] = 0;
    }
  });
  if (typeof data["120 Days"] == "undefined") {
    data["120 Days"] = 0;
  }

  if (typeof data["180 Days"] == "undefined") {
    data["180 Days"] = 0;
  }
  return data;
};

let getQuery = (data, date) => {
  data = validateData(data);
  let query = `('${data["Symbol"]}','${date}',${data["Conf."]},${data["Open"]},${data["High"]},${data["Low"]},${data["Close"]},${data["VWAP"]},${data["Vol"]},${data["Prev. Close"]},${data["Turnover"]},${data["Trans."]},${data["Diff"]}
            ,${data["Range"]},${data["Diff %"]},${data["Range %"]},${data["VWAP %"]},${data["120 Days"]},${data["180 Days"]}
            ,${data["52 Weeks High"]},${data["52 Weeks Low"]}) ,`;
  return query;
};

let generateQuery = (jsonData, date) => {
  let query = `INSERT INTO general (symbol,date,stock_confidence,open,high,low,close,vwap,vol,prev_close,turnover,trans,diff,stock_range,diff_percent,
    range_percent,vwap_percent,a120_days,a180_days,a52_weeks_high,a52_weeks_low) VALUES`;
  jsonData.forEach((result) => {
    query += getQuery(result, date);
  });
  query = query.slice(0, -1);
  query += ";";
  return query;
};

module.exports = {
  generateQuery,
  jsonCompanyData: {
    Symbol: "",
    "Conf.": 0,
    Open: 0,
    High: 0,
    Low: 0,
    Close: 0,
    VWAP: 0,
    Vol: 0,
    "Prev. Close": 0,
    Turnover: 0,
    "Trans.": 0,
    Diff: 0,
    Range: 0,
    "Diff %": 0,
    "Range %": 0,
    "VWAP %": 0,
    "52 Weeks High": 0,
    "52 Weeks Low": 0,
    "120 Days": 0,
    "180 Days": 0,
  },
};
