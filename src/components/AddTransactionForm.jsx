import React, { useState } from 'react';
import { Input } from './ui/Input';
import { RadioGroup } from './ui/RadioGroup';
import { Button } from './ui/Button';

export const AddTransactionForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'credit',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = () => {
    if (formData.description && formData.amount) {
      onSubmit({
        id: Date.now().toString(),
        description: formData.description,
        amount: parseFloat(formData.amount),
        type: formData.type,
        date: formData.date
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Description"
        type="text"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        onKeyPress={handleKeyPress}
        placeholder="Enter description"
      />
      
      <Input
        label="Amount"
        type="number"
        step="0.01"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        onKeyPress={handleKeyPress}
        placeholder="0.00"
      />
      
      <RadioGroup
        label="Type"
        options={[
          { value: 'credit', label: 'Credit' },
          { value: 'debit', label: 'Debit' }
        ]}
        value={formData.type}
        onChange={(value) => setFormData({ ...formData, type: value })}
      />
      
      <Input
        label="Date"
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      
      <div className="flex space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} className="flex-1">
          Add Transaction
        </Button>
      </div>
    </div>
  );
};