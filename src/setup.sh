

# Create folders for components, hooks, pages, services, styles, and tests
mkdir components hooks pages services styles tests

# Create the App component
echo "import React from 'react';
import LoanCalculator from './pages/LoanCalculator';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <LoanCalculator />
    </div>
  );
};

export default App;" > App.tsx

# Create the main index file
echo "import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);" > index.tsx

# Create LoanCalculator page component
echo "import React, { useState } from 'react';
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

export default LoanCalculator;" > pages/LoanCalculator.tsx

# Create FormField component
echo "import React from 'react';

interface FormFieldProps {
  label: string;
  value: number | '';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  min?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type, min }) => {
  return (
    <div className='form-field'>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} min={min} />
    </div>
  );
};

export default FormField;" > components/FormField.tsx

# Create Button component
echo "import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;" > components/Button.tsx

# Create SummaryDisplay component
echo "import React from 'react';

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
      <p>Loan Amount: \${loanAmount}</p>
      <p>Loan Term: {loanTerm} years</p>
      <p>Interest Rate: {interestRate}%</p>
      <p>Estimated Monthly Repayment: \${monthlyRepayment.toFixed(2)}</p>
    </div>
  );
};

export default SummaryDisplay;" > components/SummaryDisplay.tsx

# Create loan service for calculation
echo "export const calculateRepayment = (amount: number, term: number, rate: number): number => {
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = term * 12;
  return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
};" > services/loanService.ts

# Create global CSS
echo "body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1, h2 {
  color: #333;
}

.form-field {
  margin-bottom: 15px;
}

.error {
  color: red;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.summary-display {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}" > styles/globals.css

# Create a test for the LoanCalculator component
echo "import React from 'react';
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
});" > tests/LoanCalculator.test.tsx

# Add and commit all changes to Git
git add .
git commit -m "Initial project setup with components and test files"
