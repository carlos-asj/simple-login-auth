import "dotenv/config";
import express from "express";
import database from "./infra/database.js";

const port = process.env.PORT;
const app = express();

app.use(express.json()); // configura o backend pra receber json

app.get("/", (req, res) => {
    res.json({
        message: "Working!"
    });
});

app.get("/clientes/:id", async (req, res) => {
    const cliente = await database.selectCustomer(req.params.id);
    res.json(cliente);
});

app.get("/clientes", async (req, res) => {
    const clientes = await database.selectCustomers();
    res.json(clientes);
});

app.post("/clientes", async (req, res) => {
    await database.addCustomer(req.body);
    res.status(201).json({ message: 'Customer created!'});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});