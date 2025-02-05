const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const menuRoutes = require('./routes/menuRoutes');
const connectDB = require('./config/db');
const { resolve } = require('path');

dotenv.config();
connectDB();
const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.use('/menu', menuRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
