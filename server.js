// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/items-route');

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/items', itemsRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.static(path.join(__dirname,'/frontend/build')));

app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'/frontend/build/index.html')));

// MongoDB Connection
mongoose.connect(process.env.MONG_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Lost and Found API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
