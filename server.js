const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://todo-frontend-three-gamma.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

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

// ✅ ROUTES
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ✅ SERVER
app.listen(PORT, () => {
  console.log(`🚀 Backend live on port ${PORT}`);
});

