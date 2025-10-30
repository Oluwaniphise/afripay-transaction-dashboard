import React from 'react';
import { Wallet } from 'lucide-react';
import { TransactionItem } from './TransactionItem';
import { Button } from './ui/Button';

export const TransactionList = ({ transactions, emptyMessage, onAddNew }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
        <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No transactions found
        </h3>
        <p className="text-gray-600 mb-6">{emptyMessage}</p>
        <Button variant="primary" onClick={onAddNew}>
          Add Transaction
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};