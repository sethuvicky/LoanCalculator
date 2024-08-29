export const calculateRepayment = (amount: number, term: number, rate: number): number => {
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = term * 12;
  return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
};
