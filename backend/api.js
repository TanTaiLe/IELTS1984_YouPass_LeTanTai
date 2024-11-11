const fs = require('fs');
const path = require('path');
// const path = './data.json';
// const path = 'data.json';
const dataPath = path.resolve(__dirname, 'data.json');

const readData = () => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

module.exports = { readData };