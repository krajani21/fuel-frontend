import axios from 'axios';

const BASE_URL = "https://fuel-backend-rt32.onrender.com";

export const fetchDistanceOnly = async (origin) => {
  const response = await axios.post(`${BASE_URL}/api/distances-only`, {
    origin
  });
  return response.data;
};
