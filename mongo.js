require('dotenv').config()

const MongoClient = require('mongodb').MongoClient
let _db

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!')
    return callback(null, _db)
  }
  MongoClient.connect(process.env.CONNECTION_STRING)
    .then((client) => {
      _db = client
      callback(null, _db)
    })
    .catch((err) => {
      callback(err)
    })
}

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized')
  }
  return _db
}

module.exports = {
  initDb,
  getDb
}
// const uri = process.env.CONNECTION_STRING

// // Database Name
// const _db = process.env.DB_NAME;

// // Create a MongoDB client instance
// const client = new MongoClient(uri);

// // Function to connect to the database
// async function initDb() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//     return client.db(connect);
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// }

// module.exports = {initDb, getDb };
