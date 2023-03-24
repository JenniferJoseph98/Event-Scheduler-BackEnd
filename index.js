const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const eventRoutes = require("./routes/event");
mongoose.connect(process.env.DB_URL, () => {
  console.log("Mongoose connected");
});
app.use(express.json());
app.use(bodyParser.json());
app.use("/v1/events", eventRoutes);
app.get("/", (req, res) => {
  res.send(req.body);
});
app.listen(8000, () => console.log("Server connected"));
