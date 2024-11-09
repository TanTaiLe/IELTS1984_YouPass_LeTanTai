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

// app.post('/api/data', (req, res) => {
//   const data = readData();
//   data.push(req.body);
//   writeData(data);
//   res.status(201).json(req.body);
// });

const PORT = 5000;
app.listen(PORT, () => console.log(`Server connected to http://localhost:${PORT}`));