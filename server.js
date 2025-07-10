const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://sudhardeveloper2124:6T2BbVnDs0ze6ATn@construction.s0w45ig.mongodb.net/?retryWrites=true&w=majority&appName=construction';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Schema with required fields
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  status: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});
const Todo = mongoose.model('Todo', todoSchema);

// ✅ GET all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error('GET /todos error:', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// ✅ POST new todo with logging
app.post('/todos', async (req, res) => {
  try {
    const { text, status, startDate, endDate } = req.body;

    // ✅ Log the incoming data
    console.log("Incoming POST data:", req.body);

    // ✅ Basic validation
    if (!text || !status || !startDate || !endDate) {
      console.log("❌ Missing fields");
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newTodo = new Todo({ text, status, startDate, endDate });
    await newTodo.save();

    console.log("✅ Todo saved:", newTodo);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("❌ POST /todos error:", err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// ✅ PUT (update todo)
app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    console.error('PUT /todos/:id error:', err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// ✅ DELETE (remove todo)
app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE /todos/:id error:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// ✅ Default route
app.get('/', (req, res) => {
  res.send('API is working');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
