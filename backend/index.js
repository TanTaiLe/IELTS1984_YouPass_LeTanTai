const express = require('express');
const cors = require('cors');
const { readData, writeData } = require('./api');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/data', (req, res) => {
  const data = readData();
  res.json(data);
});

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected to http://localhost:${PORT}`));