import React from 'react';

interface SummaryDisplayProps {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyRepayment: number;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ loanAmount, loanTerm, interestRate, monthlyRepayment }) => {
  return (
    <div className='summary-display'>
      <h2>Loan Summary</h2>
      <p>Loan Amount: ${loanAmount}</p>
      <p>Loan Term: {loanTerm} years</p>
      <p>Interest Rate: {interestRate}%</p>
      <p>Estimated Monthly Repayment: ${monthlyRepayment.toFixed(2)}</p>
    </div>
  );
};

export default SummaryDisplay;
