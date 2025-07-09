const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: String,
  startDate: String,
  endDate: String,
  status: String,
});

module.exports = mongoose.model('Todo', todoSchema);
