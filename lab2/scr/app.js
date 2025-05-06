const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authorRoutes = require("./routes/authorRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/authors", authorRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Authors API with MongoDB");
});

module.exports = app;
