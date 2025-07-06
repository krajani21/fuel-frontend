import axios from 'axios';

const BASE_URL = "https://fuel-backend-rt32.onrender.com";

export const fetchVolumeBased = async (origin, budget, efficiency) => {
  const response = await axios.post(`${BASE_URL}/api/volume-based`, {
    origin,
    budget,
    efficiency
  });
  return response.data;
};
