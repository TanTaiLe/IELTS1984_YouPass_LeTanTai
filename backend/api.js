const fs = require('fs');
const path = './data.json';

const readData = () => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };