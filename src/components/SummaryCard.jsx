import React from 'react';
import { formatCurrency } from '../utils/formatters';

export const SummaryCard = ({ title, amount, icon: Icon, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>
          {formatCurrency(amount)}
        </p>
      </div>
      <div className={`${color} bg-opacity-10 p-3 rounded-full`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);