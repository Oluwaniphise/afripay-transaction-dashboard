import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { initialTransactions } from '../data/initialData';

export const useTransactions = () => {
  const [transactions, setTransactions] = useLocalStorage('transactions', initialTransactions);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const summary = useMemo(() => {
    const inflow = transactions
      .filter((t) => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
    const outflow = transactions
      .filter((t) => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      inflow,
      outflow,
      balance: inflow - outflow
    };
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    summary
  };
};