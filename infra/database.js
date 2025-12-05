import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: "localhost",
    port: "5432",
    user: "local_user",
    database: "local_db",
    password: "local_password",
  });

  try {
    await client.connect();
    const res = await client.query(queryObject);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
