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
let jsonCompanyData = {
  symbol: "",
  date: new Date().toISOString().slice(0, 10),
  stock_confidence: 0,
  open: 0,
  high: 0,
  low: 0,
  close: 0,
  vwap: 0,
  vol: 0,
  prev_close: 0,
  turnover: 0,
  trans: 0,
  diff: 0,
  stock_range: 0,
  range_percent: 0,
  diff_percent: 0,
  vwap_percent: 0,
  a120_days: 0,
  a180_days: 0,
  a52_weeks_high: 0,
  a52_weeks_low: 0,
};
let getQuery = (data, date) => {
  data = validateData(data);
  let query = `('${data["Symbol"]}','${date}',${data["Conf."]},${data["Open"]},${data["High"]},${data["Low"]},${data["Close"]},${data["VWAP"]},${data["Vol"]},${data["Prev. Close"]},${data["Turnover"]},${data["Trans."]},${data["Diff"]}
            ,${data["Range"]},${data["Diff %"]},${data["Range %"]},${data["VWAP %"]},${data["120 Days"]},${data["180 Days"]}
            ,${data["52 Weeks High"]},${data["52 Weeks Low"]}) ,`;
  return query;
};

let generateQuery = (jsonData, date) => {
  console.log("after finishing else block", jsonData[jsonData.length - 4]);
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
  jsonCompanyData,
};
