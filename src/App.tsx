import React from 'react';
import LoanCalculator from './pages/LoanCalculator';
import './styles/globals.css';
import Navbar from './components/Navbar';
const App: React.FC = () => {
  return (
    <div className='App'>
      <Navbar />
      <LoanCalculator />

    </div>
  );
};

export default App;
