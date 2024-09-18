import axios from './axiosConfig';

export const getExchangeRates = async () => {
  try {
    const response = await axios.get('/rates');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const convertCurrency = async (from, to, amount) => {
  try {
    const response = await axios.get('/convert', {
      params: { from, to, amount },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
