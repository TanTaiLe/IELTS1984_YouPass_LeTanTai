import axios from 'axios'

const DATA_URL = 'http://localhost:5000/api/data'

export const getData = async () => {
  try {
    const res = await axios.get(DATA_URL)
    return res.data
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}