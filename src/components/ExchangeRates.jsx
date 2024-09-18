import React, { useEffect, useState } from 'react';
import useCurrencyStore from '../store/useCurrencyStore';
import { getExchangeRates } from '../api/currencyService';
import { currencies } from '../constants/currencies';

const ExchangeRates = () => {
  const { rates, setRates } = useCurrencyStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchRates = async () => {
      try {
        const data = await getExchangeRates();
        if (isMounted && data && data.conversion_rates) {
          setRates(data.conversion_rates);
          setLoading(false);
        } else {
          console.error('Invalid data received from API');
          if (isMounted) setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch rates', error);
        if (isMounted) setLoading(false);
      }
    };

    fetchRates();
    const intervalId = setInterval(fetchRates, 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [setRates]);

  if (loading) {
    return <p>Loading exchange rates...</p>;
  }

  return (
    <div className='exchange-container'>
        <h2>Exchange Rates (Base: USD)</h2>
        <ul className='exchange-rates'>
            {Object.entries(rates || {})
            .filter(([currency]) => currencies.includes(currency))
            .map(([currency, rate]) => (
                <li key={currency}>
                {currency}: {rate}
                </li>
            ))}
        </ul>
    </div>
  );
};

export default ExchangeRates;
