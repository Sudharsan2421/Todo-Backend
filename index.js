const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

// ✅ Mongo URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todos';

app.use(cors());
app.use(express.json());

// ✅ MongoDB connect (cleaned)
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ✅ Schema + Model
const todoSchema = new mongoose.Schema({
  text: String,
  status: String,
  startDate: String,
  endDate: String,
});
const Todo = mongoose.model('Todo', todoSchema);

// ✅ Routes

app.get('/', (req, res) => {
  res.send('🚀 API is working');
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error('❌ GET error:', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { text, status, startDate, endDate } = req.body;
    const newTodo = new Todo({ text, status, startDate, endDate });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('❌ POST error:', err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, status, endDate } = req.body;
    const updated = await Todo.findByIdAndUpdate(
      id,
      { text, status, endDate },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('❌ PUT error:', err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    console.error('❌ DELETE error:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
