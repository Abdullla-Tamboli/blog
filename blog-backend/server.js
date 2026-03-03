const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes'); // ✅ Already added

dotenv.config();

const app = express();

// ✅ CORS configuration for frontend connection with credentials
app.use(cors({
  origin: 'https://blog-38ub.onrender.com',  // frontend origin
  credentials: true                 // allow cookies, auth headers
}));

app.use(express.json());

// Static files (images)
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// MongoDB connection and server startup
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
 
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));

// Optional root test route
app.get('/', (req, res) => {
  res.send('Blog API is running 🚀');
});
