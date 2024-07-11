const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  reference: { type: String, required: true },
  link: { type: String, required: true }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
