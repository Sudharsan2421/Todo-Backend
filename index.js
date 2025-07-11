const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT; // ✅ Use Render's assigned port

// ✅ MongoDB URI (keep it in environment variable if possible)
const MONGODB_URI = process.env.MONGO_URI || 'your_actual_mongo_uri_here';

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit if DB fails
  });

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('🚀 API is working');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
