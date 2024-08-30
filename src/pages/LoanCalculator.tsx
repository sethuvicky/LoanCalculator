import React, { useState } from 'react';
import FormField from '../components/FormField';
import Button from '../components/Button';
import SummaryDisplay from '../components/SummaryDisplay';
import { calculateRepayment } from '../services/loanService';
import './LoanCalculator.module.css'; // Ensure this file is either updated or removed if not used

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number | ''>('');
  const [loanTerm, setLoanTerm] = useState<number | ''>('');
  const [interestRate, setInterestRate] = useState<number | ''>('');
  const [monthlyRepayment, setMonthlyRepayment] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    if (!loanAmount || !loanTerm || !interestRate) {
      setError('Please fill out all fields correctly.');
      return;
    }

    setError(null);
    const repayment = calculateRepayment(Number(loanAmount), Number(loanTerm), Number(interestRate));
    setMonthlyRepayment(repayment);
  };

  return (
    <div className='container'>
      <div className='loan-calculator'>
        <h1>Loan Calculator</h1>
        <div className='form-field'>
          <label htmlFor='loan-amount'>Loan Amount</label>
          <input
            id='loan-amount'
            type='number'
            value={loanAmount}
            onChange={e => setLoanAmount(parseFloat(e.target.value))}
            min='0'
            aria-label='Loan Amount'
          />
        </div>
        <div className='form-field'>
          <label htmlFor='loan-term'>Loan Term (Years)</label>
          <input
            id='loan-term'
            type='number'
            value={loanTerm}
            onChange={e => setLoanTerm(parseFloat(e.target.value))}
            min='0'
            aria-label='Loan Term'
          />
        </div>
        <div className='form-field'>
          <label htmlFor='interest-rate'>Interest Rate (%)</label>
          <input
            id='interest-rate'
            type='number'
            value={interestRate}
            onChange={e => setInterestRate(parseFloat(e.target.value))}
            min='0'
            aria-label='Interest Rate'
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <Button onClick={handleCalculate}>Calculate</Button>
        {monthlyRepayment !== null && (
          <SummaryDisplay
            loanAmount={Number(loanAmount)}
            loanTerm={Number(loanTerm)}
            interestRate={Number(interestRate)}
            monthlyRepayment={monthlyRepayment}
          />
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
