const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"], // Include 'Authorization' for JWT
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  const authRoutes = require('./routes/auth');
  
  app.use('/auth', authRoutes);

  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
