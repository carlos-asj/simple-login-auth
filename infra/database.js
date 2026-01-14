import { Pool } from "pg";

async function connectDB() {
  // verifica se a conexão já foi criada
  if(global.connection) {
    return global.connection.connect();
  }

  // cria a pool=
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
  });
  // cria um cliente e conecta na pool
  const client = await pool.connect();
  console.log("Pool created!");

  const res = await client.query("SELECT now();");
  console.log(res.rows[0]);
  client.release(); // libera a conexão

  global.connection = pool;
  return pool.connect();
};

connectDB();

async function selectCustomers() {
  const client = await connectDB(); // conecta com o banco
  const res = await client.query("SELECT * FROM clientes"); // envia um comando para o banco
  return res.rows;
};

async function selectCustomer(id) {
  const client = await connectDB(); // conecta com o banco
  const res = await client.query("SELECT * FROM clientes WHERE ID=$1", [id]);
  return res.rows;
};

async function addCustomer(customer) {
  const client = await connectDB(); // conecta com o banco
  const sql = "INSERT INTO clientes (nome, idade, uf) VALUES ($1, $2, $3)";
  const res = await client.query(sql, [customer.nome, customer.idade, customer.uf]);
};

export default {
  selectCustomers,
  selectCustomer,
  addCustomer
}