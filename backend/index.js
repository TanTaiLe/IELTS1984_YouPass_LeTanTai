const express = require('express');
const cors = require('cors');
const path = require('path');
const process = require('process')
const { readData } = require('./api');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/data', (req, res) => {

  try {
    const data = readData();
    res.json(data);
    res.json({ message: 'Data retrieved successfully' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected to ${PORT}`));