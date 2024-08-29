import React, { useState } from 'react';
import FormField from '../components/FormField';
import Button from '../components/Button';
import SummaryDisplay from '../components/SummaryDisplay';
import { calculateRepayment } from '../services/loanService';
import './LoanCalculator.module.css';

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
    const repayment = calculateRepayment(loanAmount, loanTerm, interestRate);
    setMonthlyRepayment(repayment);
  };

  return (
    <div className='loan-calculator'>
      <h1>Loan Calculator</h1>
      <FormField
        label='Loan Amount'
        value={loanAmount}
        onChange={e => setLoanAmount(parseFloat(e.target.value))}
        type='number'
        min='0'
      />
      <FormField
        label='Loan Term (Years)'
        value={loanTerm}
        onChange={e => setLoanTerm(parseFloat(e.target.value))}
        type='number'
        min='0'
      />
      <FormField
        label='Interest Rate (%)'
        value={interestRate}
        onChange={e => setInterestRate(parseFloat(e.target.value))}
        type='number'
        min='0'
      />
      {error && <p className='error'>{error}</p>}
      <Button onClick={handleCalculate}>Calculate</Button>
      {monthlyRepayment !== null && (
        <SummaryDisplay
          loanAmount={loanAmount}
          loanTerm={loanTerm}
          interestRate={interestRate}
          monthlyRepayment={monthlyRepayment}
        />
      )}
    </div>
  );
};

export default LoanCalculator;
