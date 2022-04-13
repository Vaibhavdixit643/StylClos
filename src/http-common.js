import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:7080/',
  headers: {
    'Content-Type': 'application/json',
  },
});