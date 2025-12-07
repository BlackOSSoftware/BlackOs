import mongoose, { Mongoose } from "mongoose";
import { MongoClient, Db } from "mongodb";

// Extend NodeJS.Global to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

// Use cached connection or initialize
const cachedMongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null } =
  global._mongoose ?? { conn: null, promise: null };

// MongoClient cached connection
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectDB(): Promise<{ mongoose: Mongoose; db: Db }> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Please add MONGODB_URI to .env.local");

  const mongoUri = uri;

  // Mongoose connection
  if (!cachedMongoose.conn) {
    if (!cachedMongoose.promise) {
      cachedMongoose.promise = mongoose.connect(mongoUri).then(m => m);
    }
    cachedMongoose.conn = await cachedMongoose.promise;
    global._mongoose = cachedMongoose; // ✅ type-safe
  }

  // MongoClient connection
  if (!cachedDb) {
    if (!cachedClient) {
      cachedClient = new MongoClient(mongoUri);
      await cachedClient.connect();
    }
    cachedDb = cachedClient.db("blackos"); // your DB name
  }

  return { mongoose: cachedMongoose.conn, db: cachedDb };
}
