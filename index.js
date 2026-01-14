import "dotenv/config";
import express from "express";
import { connection } from "./infra/postgres.js";
import router from "./view/routes.js";

const port = process.env.PORT;
const app = express();

app.use(router);
app.use(express.json()); // configura o backend pra receber json

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connection();