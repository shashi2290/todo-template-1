// create todo schema
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: Boolean,
  priority: {
    type: String,
    enum: ['low', 'med', 'high']
  }
});

module.exports = mongoose.model('Todo', todoSchema)