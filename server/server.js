const express = require("express");
const app = express();
const PORT = 3070;
const HOST = "localhost";
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: "*",
    Credential: true,
  })
);

// other functions
const XLSX = require("xlsx");

app.get("/", (req, res) => {
  res.send({
    status: true,
  });
});
app.post("/hey", (req, res) => {
  console.log(req.body);
  res.send("got it");
});
app.listen(PORT, HOST, (err) => {
  if (err) {
    console.log("Error found");
  } else {
    console.log("Server created at ", HOST, "/", PORT);
  }
});

/*
const XLSX = require('xlsx');
const fs = require("fs");

let wb = XLSX.readFile("./share.xlsx",{
    cellHTML:false,
});
let mainData =XLSX.utils.sheet_to_json(wb.Sheets["main"]);


let validateData = (data)=>{
    Object.entries(data).forEach(result=>{
        if(data[result[0]] == '-'){

            data[result[0]] = 0;
        }
    });
    if(typeof(data["120 Days"]) == 'undefined'){
        data["120 Days"] = 0;
    }
    
    if(typeof(data["180 Days"]) == 'undefined'){
        data["180 Days"] = 0;
    }
    return data;
}

let getQuery = (data,date)=>{
    data = validateData(data);
    let query =`('${data['Symbol']}','${date}',${data['Conf.']},${data['Open']},${data['High']},${data['Low']},${data['Close']},${data['VWAP']},${data['Vol']},${data['Prev. Close']},${data['Turnover']},${data['Trans.']},${data['Diff']}
            ,${data['Range']},${data['Diff %']},${data['Range %']},${data['VWAP %']},${data['120 Days']},${data['180 Days']}
            ,${data['52 Weeks High']},${data['52 Weeks Low']}) ,`;
                return query;  
};


let query = `INSERT INTO general (symbol,date,stock_confidence,open,high,low,close,vwap,vol,prev_close,turnover,trans,diff,stock_range,diff_percent,
    range_percent,vwap_percent,a120_days,a180_days,a52_weeks_high,a52_weeks_low) VALUES`;
mainData.forEach(result=>{        
        query+=getQuery(result,"2021-10-19");
});
query = query.slice(0,-1);
query+=';';

fs.writeFile("./command.sql",query,(err)=>{
    if(err){
        console.log("Found error while writing command to file. ");
    }
})



*/
