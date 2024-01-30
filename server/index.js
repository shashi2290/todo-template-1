// create a server endopint in express 
const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const app = express();
const cors = require('cors');
app.use(cors());
//db connect
const connectDB = async () => {
  try {
    const pwd = encodeURIComponent('xxxxx');
    await mongoose.connect(`mongodb+srv://shashi:xxx@cluster0.edjrq.mongodb.net/?retryWrites=true&w=majority`);
    console.log('connected')
  }catch(err) {
    console.log(err);
  }
}

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// create a get request
app.get('/', async (req, res) => {
  let todos;
  try{
    todos = await Todo.find();
  } catch(err) {
    console.log(err);
  }
  if(!todos && !todos.length) {
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
app.post('/create', async (req, res) => {
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
});

app.delete('/delete/:id', async(req, res) => {
  const id = req.params.id;
  const todo = await Todo.findByIdAndDelete(id);

  if(!todo) {
    res.json({
      success: false,
      message: "Id not found"
    })
  }
  res.json({
    success: true,
    message: "Todo deleted"
  })
})

const port = 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));