const express = require('express');
const cors = require('cors');
const Todo = require('./models/Todo'); // <- import your model

const app = express();
app.use(cors());
app.use(express.json());

// Get all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add new todo
app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

// Update todo
app.put('/todos/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
