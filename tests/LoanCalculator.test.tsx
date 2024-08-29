import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoanCalculator from '../pages/LoanCalculator';

test('renders loan calculator form and calculates repayment', () => {
  render(<LoanCalculator />);

  const loanAmountInput = screen.getByLabelText(/Loan Amount/i);
  const loanTermInput = screen.getByLabelText(/Loan Term/i);
  const interestRateInput = screen.getByLabelText(/Interest Rate/i);
  const calculateButton = screen.getByText(/Calculate/i);

  fireEvent.change(loanAmountInput, { target: { value: '10000' } });
  fireEvent.change(loanTermInput, { target: { value: '5' } });
  fireEvent.change(interestRateInput, { target: { value: '5' } });
  fireEvent.click(calculateButton);

  expect(screen.getByText(/Estimated Monthly Repayment:/i)).toBeInTheDocument();
});
