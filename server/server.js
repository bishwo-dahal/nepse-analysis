const express = require("express");
const app = express();
const PORT = process.env.PORT || 3070;
const HOST = "localhost";
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:8081",
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
// db.sequelize.sync({ alter: true });

app.use("/api/", require("./routes/routes"));

app.get("/api/", (req, res) => {
  res.send({
    status: true,
  });
});
app.get("/api/readExcel", async (req, res) => {
  let currentWorkBook = XLSX.readFile("./data/share.xlsx");
  let htmlData = XLSX.utils.sheet_to_html(
    currentWorkBook.Sheets[currentWorkBook.SheetNames[0]]
  );
  res.send(htmlData);
});

app.use(express.static(__dirname + "/dist"));

app.listen(PORT, HOST, (err) => {
  if (err) {
    console.log("Error found");
  } else {
    console.log("Server created at ", HOST, "/", PORT);
  }
});
