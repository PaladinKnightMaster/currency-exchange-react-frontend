import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CurrencyConverterForm from '../CurrencyConverterForm';

test('renders form and validates input', async () => {
  const handleSubmit = jest.fn();
  render(<CurrencyConverterForm onSubmit={handleSubmit} />);

  // Successful submission
  fireEvent.change(screen.getByLabelText(/From Currency/i), {
    target: { value: 'USD' },
  });
  fireEvent.change(screen.getByLabelText(/To Currency/i), {
    target: { value: 'EUR' },
  });
  fireEvent.change(screen.getByLabelText(/Amount/i), {
    target: { value: '100' },
  });

  fireEvent.click(screen.getByText(/Convert/i));

  await waitFor(() => expect(handleSubmit).toHaveBeenCalled());

  expect(handleSubmit).toHaveBeenCalledWith(
    { from: 'USD', to: 'EUR', amount: 100 },
    expect.anything()
  );
});

test('displays validation errors if required fields are missing', async () => {
  const handleSubmit = jest.fn();
  render(<CurrencyConverterForm onSubmit={handleSubmit} />);

  // Submit without filling in any values to trigger validation errors
  fireEvent.click(screen.getByText(/Convert/i));

  // Check for error messages related to required fields
  expect(await screen.findByText(/From currency is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/To currency is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/Amount must be a number/i)).toBeInTheDocument(); // Correct message for amount field

  // Ensure handleSubmit is not called due to validation errors
  expect(handleSubmit).not.toHaveBeenCalled();
});

test('displays validation errors for invalid amount', async () => {
  const handleSubmit = jest.fn();
  render(<CurrencyConverterForm onSubmit={handleSubmit} />);

  // Fill in valid currencies but invalid amount
  fireEvent.change(screen.getByLabelText(/From Currency/i), {
    target: { value: 'USD' },
  });
  fireEvent.change(screen.getByLabelText(/To Currency/i), {
    target: { value: 'EUR' },
  });
  fireEvent.change(screen.getByLabelText(/Amount/i), {
    target: { value: '-100' }, // Invalid negative amount
  });

  fireEvent.click(screen.getByText(/Convert/i));

  // Check for error message related to invalid amount
  expect(await screen.findByText(/Amount must be positive/i)).toBeInTheDocument();

  // Ensure handleSubmit is not called due to validation errors
  expect(handleSubmit).not.toHaveBeenCalled();
});
