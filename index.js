require("dotenv").config();

const db = require("./infra/database.js");

const port = process.env.PORT;

const express = require("express");

const app = express();

app.use(express.json()); // configura o backend pra receber json

app.get("/", (req, res) => {
    res.json({
        message: "Working!"
    });
});

app.get("/clientes/:id", async (req, res) => {
    const cliente = await db.selectCustomer(req.params.id);
    res.json(cliente);
});

app.get("/clientes", async (req, res) => {
    const clientes = await db.selectCustomers();
    res.json(clientes);
});

app.post("/clientes", async (req, res) => {
    await db.addCustomer(req.body);
    res.sendStatus(201);
});

app.listen(port);

console.log("Backend running")