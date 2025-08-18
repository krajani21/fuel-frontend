import axios from 'axios';

const BASE_URL = "https://fuel-backend-rt32.onrender.com";


export const fetchDistanceOnly = async (origin, radius) => {
  const requestBody = { origin };
  if (radius) {
    requestBody.radius = radius;
  }
  
  const response = await axios.post(`${BASE_URL}/api/distances-only`, requestBody);
  return response.data;
};


