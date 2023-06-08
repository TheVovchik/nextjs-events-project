const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://volodyanosachenko:qA4jloB1yZy8ydgS@cluster0.fnz7i9a.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const connectDB = async () => {
  await client.connect();
};

export const insertDoc = async (dataBaseName, insertedData) => {
  const db = client.db();

  await db.collection(dataBaseName).insertOne(insertedData);
};

export const closeDB = () => {
  client.close();
};

export const getCollectionItem = async (dataBaseName, finder = {}) => {
  const db = client.db();

  return await db.collection(dataBaseName)
    .find(finder)
    .sort({ _id: -1 })
    .toArray();
};