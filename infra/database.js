const { Client, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://darcilemonsms_db_user:mqApQlfCFCJuMn1f@casjdev.blfoghx.mongodb.net/?appName=casjdev";

const client = new Client(uri, {
  server_api: {
    version: ServerApiVersion.vl,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
