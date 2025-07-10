const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = 'mongodb+srv://sudhardeveloper2124:6T2BbVnDs0ze6ATn@construction.s0w45ig.mongodb.net/?retryWrites=true&w=majority&appName=construction';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Mongo connected'))
  .catch(err => console.error('❌ Mongo error', err));

// Schema
const todoSchema = new mongoose.Schema({
  text: String,
  status: String,
  startDate: String,
  endDate: String,
});
const Todo = mongoose.model('Todo', todoSchema);

// ✅ Routes
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  try {
    const { text, status, startDate, endDate } = req.body;
    const newTodo = new Todo({ text, status, startDate, endDate });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Optional base route
app.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend live on port ${PORT}`);
});
