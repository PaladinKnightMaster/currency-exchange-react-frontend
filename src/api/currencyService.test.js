import axios from './axiosConfig';
import { getExchangeRates, convertCurrency } from './currencyService';

// Mock the axios instance
jest.mock('./axiosConfig');

describe('currencyService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getExchangeRates', () => {
    it('should return exchange rates on success', async () => {
      const mockData = {
        conversion_rates: {
          USD: 1.0,
          EUR: 0.85,
          GBP: 0.75,
        },
      };

      // Mock the axios get request
      axios.get.mockResolvedValueOnce({ data: mockData });

      // Call the function
      const result = await getExchangeRates();

      // Assert the result
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('/rates');
    });

    it('should throw an error when the request fails', async () => {
      // Mock an error
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      // Call the function and expect an error to be thrown
      await expect(getExchangeRates()).rejects.toThrow(errorMessage);
      expect(axios.get).toHaveBeenCalledWith('/rates');
    });
  });

  describe('convertCurrency', () => {
    it('should return the converted amount on success', async () => {
      const mockData = {
        from: 'USD',
        to: 'EUR',
        amount: 100,
        converted: 85,
      };

      // Mock the axios get request
      axios.get.mockResolvedValueOnce({ data: mockData });

      // Call the function
      const result = await convertCurrency('USD', 'EUR', 100);

      // Assert the result
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('/convert', {
        params: { from: 'USD', to: 'EUR', amount: 100 },
      });
    });

    it('should throw an error when the request fails', async () => {
      // Mock an error
      const errorMessage = 'Conversion Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      // Call the function and expect an error to be thrown
      await expect(convertCurrency('USD', 'EUR', 100)).rejects.toThrow(errorMessage);
      expect(axios.get).toHaveBeenCalledWith('/convert', {
        params: { from: 'USD', to: 'EUR', amount: 100 },
      });
    });
  });
});
