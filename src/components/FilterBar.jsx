import React from "react";
import { Filter, Download, Plus } from "lucide-react";
import { Button } from "./ui/Button";

export const FilterBar = ({
  activeFilter,
  onFilterChange,
  onExportCSV,
  onExportExcel,
  onAddNew,
}) => {
  const filters = [
    { value: "all", label: "All" },
    { value: "credit", label: "Credits" },
    { value: "debit", label: "Debits" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <div className="flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => onFilterChange(filter.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeFilter === filter.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex space-x-2  space-y-2 md:space-y-0 flex-wrap">
          <Button variant="secondary" onClick={onExportCSV} icon={Download}>
            CSV
          </Button>
          <Button variant="secondary" onClick={onExportExcel} icon={Download}>
            Excel
          </Button>
          <Button variant="primary" onClick={onAddNew} icon={Plus}>
            Add Transaction
          </Button>
        </div>
      </div>
    </div>
  );
};
