import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: false,
  }
});

export async function connectMongoDB() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  }
  catch(error) {
    console.dir(error)
  } finally {
    await client.close();
  }
}
