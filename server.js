const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
const MONGO_URI = 'mongodb+srv://sudhardeveloper2124:6T2BbVnDs0ze6ATn@construction.s0w45ig.mongodb.net/?retryWrites=true&w=majority&appName=construction';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Schema
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
  const newTodo = new Todo(req.body);
  const saved = await newTodo.save();
  res.json(saved);
});

app.put('/todos/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at ${PORT}`);
});
