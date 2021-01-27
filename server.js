const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const path = require('path');
const connectDB = require('./db');

const app = express();

connectDB();

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));