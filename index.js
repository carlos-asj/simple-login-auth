import "dotenv/config";
import express from "express";
import { connection } from "./infra/postgres.js";
import router from "./view/routes.js";
import cors from 'cors';

const port = process.env.PORT;
const app = express();

app.use(cors());

app.use(express.json()); // configura o backend pra receber json * sempre antes das rotas
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connection();