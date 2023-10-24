import express from "express";
import mongoDbConnection from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use("/", (req, res) => {
  res.send("SA");
});

mongoDbConnection();
app.listen(5000);
