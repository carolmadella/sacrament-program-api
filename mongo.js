require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.CONNECTION_STRING

// Database Name
const dbName = process.env.DB_NAME;

// copied from ChatGPT the code below
// Create a MongoDB client instance
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to connect to the database
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = {connectDB, ObjectId };