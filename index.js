const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// ✅ MongoDB connection string (replace with your real one)
const MONGODB_URI = 'mongodb+srv://sudhardeveloper2124:6T2BbVnDs0ze6ATn@construction.s0w45ig.mongodb.net/?retryWrites=true&w=majority&appName=todo';

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

// ✅ Basic route for testing
app.get('/', (req, res) => {
  res.send('API is working');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
