import * as XLSX from 'xlsx';
import { formatDate } from '../utils/formatters';

export const exportService = {
  toCSV: (transactions) => {
    const data = transactions.map((t) => ({
      Date: formatDate(t.date),
      Description: t.description,
      Type: t.type.toUpperCase(),
      Amount: t.amount
    }));

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map((row) => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  },

  toExcel: (transactions) => {
    const data = transactions.map((t) => ({
      Date: formatDate(t.date),
      Description: t.description,
      Type: t.type.toUpperCase(),
      Amount: t.amount
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, `transactions-${new Date().toISOString().split('T')[0]}.xlsx`);
  }
};