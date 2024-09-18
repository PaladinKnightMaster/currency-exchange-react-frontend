// src/App.jsx
import React, { useState } from 'react';
import ExchangeRates from './components/ExchangeRates';
import CurrencyConverterForm from './components/CurrencyConverterForm';
import './App.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertCurrency } from './api/currencyService';

const App = () => {
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConvert = async (data) => {
    try {
      const result = await convertCurrency(data.from, data.to, data.amount);
      setConvertedAmount(result.converted_amount);
      toast.success(`Converted Amount: ${result.converted_amount}`);
    } catch (error) {
      toast.error('Conversion failed');
    }
  };

  return (
    <div className='app-container'>
      <h1 style={{ textAlign: 'center' }}>Currency Converter</h1>
      <ExchangeRates />
      <CurrencyConverterForm onSubmit={handleConvert} />
      <div className="converted-amount">
        <h2>Converted Amount</h2>
        <p>{convertedAmount}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
