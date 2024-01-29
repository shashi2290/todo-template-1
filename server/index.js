// create a server endopint in express 
const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const app = express();
const cors = require('cors');
app.use(cors());
//db connect
mongoose.connect('mongodb+srv://<user>:<pwd>@cluster0.edjrq.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// create a get request
app.get('/', async (req, res) => {
  const todos = await Todo.find();
  if(!todos.length) {
    return res.json({
      success: false
    });
  }
  return res.json({
    success: true,
    todos
  });
});

//create a post api
app.post('/', async (req, res) => {
  console.log(req.body)
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority
  });

  todo.save().then((todo) => {
    return res.json({
      success: true,
      todo
    });
  }).catch((err) => {
    res.json({
      success: false,
      message: err.message
    })
  })
  
})

const port = 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));