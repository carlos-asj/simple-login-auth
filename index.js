require("dotenv").config();

const db = require("./infra/database.js");

const port = process.env.PORT;

const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Working!"
    })
})

app.listen(port);

console.log("Backend running")