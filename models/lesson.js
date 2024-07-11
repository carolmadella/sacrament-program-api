const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  weekNumber: String,
  url: String,
  title: String,
  dateRange: String,
  scripture: String
});

module.exports = mongoose.model('Lesson', lessonSchema);