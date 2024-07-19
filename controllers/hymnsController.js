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

  try {
    const db = await mongodb.initDb();

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
    const db = await mongodb.initDb();
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

// PUT Request
exports.updateHymn = async (req, res) => {
    const hymnsId = req.params.id;
    const updatedHymn = req.body;
  
    //data validation
    if (hymnsId == null || updatedHymn == null) {
      return res.status(404).json({ error: "invalid input provided" });
    }
  
    try {
      const db = await mongodb.initDb();
      const collection = db.collection("hymns");
  
      // Update the hymn by ID
      const result = await collection.findOneAndUpdate(
        { _id: new mongodb.ObjectId (hymnsId) },
        { $set: updatedHymn },
        { returnNewDocument: true }
      );
  
      // Check if the hymn was found and updated
      if (!result) {
        return res.status(404).json({ error: "Hymn not found" });
      }
  
      res.status(204).json({
        message: "Hymn updated successfully",
      });
    } catch (error) {
      console.error("Error updating hymn:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
// DELETE route to delete a resource
exports.deleteHymn = async (req, res) => {
  const hymnId = req.params.id;

  //data validation
  if (hymnId == null) {
    return res.status(404).json({ error: "invalid input provided" });
  }
  try {
    const db = await mongodb.initDb();
    const collection = db.collection("hymns");

    // Delete the hymn by ID
    const result = await collection.findOneAndDelete({
      _id: new mongodb.ObjectId(hymnId),
    });

    // Check if the hymn was found and deleted
    if (!result) {
      return res.status(404).json({ error: "Hymn not found" });
    }

    res.status(200).json({ message: "Hymn deleted successfully" });
  } catch (error) {
    console.error("Error deleting Hymn:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

