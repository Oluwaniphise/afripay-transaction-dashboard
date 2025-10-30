import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export const TransactionItem = ({ transaction }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-gray-200 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <div
          className={`p-2 rounded-full ${
            transaction.type === 'credit'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {transaction.type === 'credit' ? (
            <TrendingUp className="w-5 h-5" />
          ) : (
            <TrendingDown className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
          <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-lg font-bold ${
            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {transaction.type === 'credit' ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>
        <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
      </div>
    </div>
  </div>
);