import axios from 'axios';

const BASE_URL = "https://fuel-backend-rt32.onrender.com";

export const fetchVolumeBased = async (origin, budget, efficiency, radius) => {
  const requestBody = { origin, budget, efficiency };
  if (radius) {
    requestBody.radius = radius;
  }
  
  const response = await axios.post(`${BASE_URL}/api/volume-based`, requestBody);
  return response.data;
};


