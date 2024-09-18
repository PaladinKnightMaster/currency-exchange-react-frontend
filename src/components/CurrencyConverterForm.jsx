import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { currencies } from '../constants/currencies';

const conversionSchema = yup.object().shape({
  from: yup.string().required('From currency is required'),
  to: yup.string().required('To currency is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .positive('Amount must be positive'),
});

const CurrencyConverterForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(conversionSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="currency-form">
      <div className="form-group">
        <label htmlFor="from">From Currency</label>
        <select id="from" {...register('from')}>
          <option value="">Select currency</option>
          {currencies.map((currency) => (
            <option key={`from-${currency}`} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        {errors.from && <p className="error-message">{errors.from.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="to">To Currency</label>
        <select id="to" {...register('to')}>
          <option value="">Select currency</option>
          {currencies.map((currency) => (
            <option key={`to-${currency}`} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        {errors.to && <p className="error-message">{errors.to.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input id="amount" type="number" {...register('amount')} />
        {errors.amount && (
          <p className="error-message">{errors.amount.message}</p>
        )}
      </div>

      <button type="submit">Convert</button>
    </form>
  );
};

export default CurrencyConverterForm;
