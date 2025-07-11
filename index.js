const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'your_fallback_mongo_uri_here';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Stop the app if DB fails
  });

// ✅ Mongoose Schema & Model
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
    console.error("❌ Fetch error:", err);
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
    console.error("❌ Add error:", err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// (Optional: add PUT and DELETE routes too)

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
