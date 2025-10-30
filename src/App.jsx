import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useTransactions } from './hooks/useTransaction';
import { exportService } from './services/exportService';
import { SummaryCard } from './components/SummaryCard';
import { FilterBar } from './components/FilterBar';
import { TransactionList } from './components/TransactionList';
import { Modal } from './components/ui/Modal';
import { AddTransactionForm } from './components/AddTransactionForm';

function App() {
  const { transactions, addTransaction, summary } = useTransactions();
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

  const handleAddTransaction = (transaction) => {
    addTransaction(transaction);
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    exportService.toCSV(filteredTransactions);
  };

  const handleExportExcel = () => {
    exportService.toExcel(filteredTransactions);
  };

  const getEmptyMessage = () => {
    if (filter === 'all') {
      return 'Add your first transaction to get started';
    }
    return `No ${filter} transactions to display`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Transaction Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and track your financial transactions
          </p>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total Inflow"
            amount={summary.inflow}
            icon={TrendingUp}
            color="text-green-600"
          />
          <SummaryCard
            title="Total Outflow"
            amount={summary.outflow}
            icon={TrendingDown}
            color="text-red-600"
          />
          <SummaryCard
            title="Net Balance"
            amount={summary.balance}
            icon={Wallet}
            color={summary.balance >= 0 ? 'text-blue-600' : 'text-red-600'}
          />
        </section>

        {/* Filter and Actions Bar */}
        <FilterBar
          activeFilter={filter}
          onFilterChange={setFilter}
          onExportCSV={handleExportCSV}
          onExportExcel={handleExportExcel}
          onAddNew={() => setIsModalOpen(true)}
        />

        {/* Transactions List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Transactions
            </h2>
            <span className="text-sm text-gray-600">
              {filteredTransactions.length} transaction
              {filteredTransactions.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <TransactionList
            transactions={filteredTransactions}
            emptyMessage={getEmptyMessage()}
            onAddNew={() => setIsModalOpen(true)}
          />
        </section>
      </div>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Transaction"
      >
        <AddTransactionForm
          onSubmit={handleAddTransaction}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;