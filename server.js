const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "demo",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

// Routes
app.get("/api/get_data", (req, res) => {
  let sql = "SELECT * FROM data";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/api/add_data", (req, res) => {
  let data = {
    title: req.body.title,
    desc: req.body.desc,
    date: req.body.date,
    select: req.body.select,
    img: req.body.img,
  };
  let sql = "INSERT INTO data SET ?";
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send("Data added...");
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
