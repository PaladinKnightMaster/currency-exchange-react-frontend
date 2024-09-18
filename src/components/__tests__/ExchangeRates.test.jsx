import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ExchangeRates from '../ExchangeRates';
import { getExchangeRates } from '../../api/currencyService';
import { act } from 'react-dom/test-utils';

jest.mock('../../api/currencyService');

jest.mock('../../store/useCurrencyStore', () => {
  let ratesState = {};
  const setRatesMock = jest.fn((newRates) => {
    ratesState = newRates;
  });

  return {
    __esModule: true,
    default: () => ({
      rates: ratesState,
      setRates: setRatesMock,
    }),
  };
});

describe('ExchangeRates Component', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockRestore();
  });

  test('displays loading state initially', () => {
    render(<ExchangeRates />);
    expect(screen.getByText('Loading exchange rates...')).toBeInTheDocument();
  });

  test('renders exchange rates on successful API call', async () => {
    const mockData = {
      conversion_rates: {
        USD: 1.0,
        EUR: 0.85,
        GBP: 0.75,
      },
    };
    getExchangeRates.mockResolvedValueOnce(mockData);

    render(<ExchangeRates />);

    await act(async () => {
      await waitFor(() => {
        expect(jest.requireMock('../../store/useCurrencyStore').default().setRates)
          .toHaveBeenCalledWith(mockData.conversion_rates);
      });
    });

    const displayedRates = await waitFor(() => screen.getAllByRole('listitem'));
    expect(displayedRates).toHaveLength(3);

    expect(screen.getByText('USD: 1')).toBeInTheDocument();
    expect(screen.getByText('EUR: 0.85')).toBeInTheDocument();
    expect(screen.getByText('GBP: 0.75')).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    getExchangeRates.mockRejectedValueOnce(new Error('API Error'));

    render(<ExchangeRates />);

    await waitFor(() => expect(jest.requireMock('../../store/useCurrencyStore').default().setRates).not.toHaveBeenCalled());

    expect(screen.queryByText('Loading exchange rates...')).not.toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith('Failed to fetch rates', expect.any(Error));
  });

  // Test case for invalid data (line 21-25)
  test('handles invalid data gracefully', async () => {
    const invalidData = {
      conversion_rates: null, // Invalid data
    };

    getExchangeRates.mockResolvedValueOnce(invalidData);

    render(<ExchangeRates />);

    await waitFor(() => {
      expect(screen.queryByText('Loading exchange rates...')).not.toBeInTheDocument();
      expect(console.error).toHaveBeenCalledWith('Invalid data received from API');
    });
  });

  // Test case for empty rates data (line 46)
  test('handles empty rates data gracefully', async () => {
    const emptyData = {
      conversion_rates: {}, // No rates available
    };

    getExchangeRates.mockResolvedValueOnce(emptyData);

    render(<ExchangeRates />);

    await act(async () => {
      await waitFor(() => {
        expect(jest.requireMock('../../store/useCurrencyStore').default().setRates)
          .toHaveBeenCalledWith(emptyData.conversion_rates);
      });
    });

    // Ensure no list items are displayed for empty rates
    const displayedRates = screen.queryAllByRole('listitem');
    expect(displayedRates).toHaveLength(0);
  });
});
