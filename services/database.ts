import * as mongodb from "mongodb";

export const collections: {
  tasks?: mongodb.Collection;
  users?: mongodb.Collection;
} = {};

export async function connectToDatabase() {
  const client: mongodb.MongoClient = new mongodb.MongoClient(
    process.env.DB_CONN_URL!
  );

  await client.connect();

  const db: mongodb.Db = client.db(process.env.DB_NAME);

  const taskCollection: mongodb.Collection = db.collection(
    process.env.TASK_COLLECTION_NAME!
  );

  const userCollection: mongodb.Collection = db.collection(
    process.env.USER_COLLECTION_NAME!
  );

  collections.tasks = taskCollection;
  collections.users = userCollection;

  console.log(`Successfully connected to database: ${db.databaseName} `);
}
