const fs = require('fs');
const path = './data.json';

const readData = () => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

module.exports = { readData };