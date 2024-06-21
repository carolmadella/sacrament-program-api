const mongodb = require("../mongo.js");

// GET Request
exports.getAllHymns = (req, res) => {
    res.send('Get all hymns');
};

// GET Request with path param
exports.getHymnById = async (req, res) => {
  
  const dataId = req.params.id

  //data validation
  if (dataId == null) {
    return res.status(404).json({ error: "invalid input provided" });
  }

  // copied from ChatGPT the code below
  try {
    const db = await mongodb.connectDB();

    // Get a reference to the collection
    const collection = db.collection("hymns");

    // Find documents in the collection
    const document = await collection.findOne({ _id: new mongodb.ObjectId(dataId) });

    console.log(document);

    res.status(201).json(document);
  } catch (err) {
    console.error("Error reading documents:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
  
// POST Request
exports.createHymn = async (req, res) => {

  // get body from request
  const requestData = req.body;

  //data validation
  if (requestData == null) {
    return res.status(404).json({ error: "invalid input provided" });
  }

  try {
    const db = await mongodb.connectDB();
    const collection = db.collection("hymns");

    // Insert data into the collection
    const result = await collection.insertOne(requestData);
    const insertedDataID = result.insertedId.toString();

    res
      .status(201)
      .json({ message: "Data inserted successfully", id: insertedDataID });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }

};

