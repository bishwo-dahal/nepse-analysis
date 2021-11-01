const express = require("express");
const app = express();
const PORT = 3070;
const HOST = "localhost";
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// other functions
const XLSX = require("xlsx");
const fs = require("fs");
const { QueryTypes, Sequelize } = require("sequelize");

//local files
const db = require("./models");
db.sequelize.authenticate();

//routes
app.use("/general", require("./routes/general/index"));

app.get("/", (req, res) => {
  res.send({
    status: true,
  });
});
app.get("/readExcel", async (req, res) => {
  let currentWorkBook = XLSX.readFile("./data/share.xlsx");
  let htmlData = XLSX.utils.sheet_to_html(
    currentWorkBook.Sheets[currentWorkBook.SheetNames[0]]
  );
  res.send(htmlData);
});
app.listen(PORT, HOST, (err) => {
  if (err) {
    console.log("Error found");
  } else {
    console.log("Server created at ", HOST, "/", PORT);
  }
});
