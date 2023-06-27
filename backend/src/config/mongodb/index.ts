import { Db, MongoClient } from 'mongodb'
import 'dotenv/config'

const mongoClient = new MongoClient(process.env.DATABASE_MONGO_URL)
let mongoDb: Db

async function connectDB() {
  await mongoClient.connect()
}

try {
  connectDB()
  mongoDb = mongoClient.db()
} catch (err) {
  console.log(`ERRO AO CONECTAR AO BANCO: ${err}`)
}

export default mongoDb