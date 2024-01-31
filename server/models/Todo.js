// create todo schema
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: Boolean,
  priority: {
    type: String,
    enum: ['low', 'med', 'high']
  },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Todo', todoSchema)