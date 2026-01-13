async function connectDB() {
  // verifica se a conexão já foi criada
  if(global.connection) {
    return global.connection.connect();
  }

  // cria a pool
  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
  });
  // cria um cliente e conecta na pool
  const client = await pool.connect();
  console.log("Pool created!")

  const res = await client.query("SELECT now();");
  console.log(res.rows[0]);
  client.release(); // libera a conexão

  global.connection = pool;
  return pool.connect();
};

connectDB();
