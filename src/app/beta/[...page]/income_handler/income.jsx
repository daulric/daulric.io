"use client"
import React, { useState } from 'react';

const IncomeManager = () => {
  const [incomes, setIncomes] = useState([{ label: 'Salary', amount: 0 }]);
  const [deductions, setDeductions] = useState([{ label: 'Tax', amount: 0 }]);

  const addIncome = () => {
    setIncomes([...incomes, { label: '', amount: 0 }]);
  };

  const addDeduction = () => {
    setDeductions([...deductions, { label: '', amount: 0 }]);
  };

  const updateIncome = (index, field, value) => {
    const newIncomes = [...incomes];
    newIncomes[index][field] = field === 'amount' ? Number(value) : value;
    setIncomes(newIncomes);
  };

  const updateDeduction = (index, field, value) => {
    const newDeductions = [...deductions];
    newDeductions[index][field] = field === 'amount' ? Number(value) : value;
    setDeductions(newDeductions);
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalDeductions = deductions.reduce((sum, deduction) => sum + deduction.amount, 0);
  const takeHomeSalary = totalIncome - totalDeductions;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Income Manager</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-white">Income Sources</h2>
          {incomes.map((income, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                placeholder="Label"
                value={income.label}
                onChange={(e) => updateIncome(index, 'label', e.target.value)}
                className="mr-2 p-2 bg-gray-700 border border-gray-600 rounded w-1/2 text-white"
              />
              <input
                type="number"
                placeholder="Amount"
                value={income.amount}
                onChange={(e) => updateIncome(index, 'amount', e.target.value)}
                className="p-2 bg-gray-700 border border-gray-600 rounded w-1/2 text-white"
              />
            </div>
          ))}
          <button onClick={addIncome} className="mt-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">
            Add Income
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-white">Deductions</h2>
          {deductions.map((deduction, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                placeholder="Label"
                value={deduction.label}
                onChange={(e) => updateDeduction(index, 'label', e.target.value)}
                className="mr-2 p-2 bg-gray-700 border border-gray-600 rounded w-1/2 text-white"
              />
              <input
                type="number"
                placeholder="Amount"
                value={deduction.amount}
                onChange={(e) => updateDeduction(index, 'amount', e.target.value)}
                className="p-2 bg-gray-700 border border-gray-600 rounded w-1/2 text-white"
              />
            </div>
          ))}
          <button onClick={addDeduction} className="mt-2 p-2 bg-red-600 text-white rounded hover:bg-red-700 w-full">
            Add Deduction
          </button>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-4 text-white">Summary</h2>
          <p className="mb-2 text-white">Total Income: ${totalIncome.toFixed(2)}</p>
          <p className="mb-2 text-white">Total Deductions: ${totalDeductions.toFixed(2)}</p>
          <p className="text-lg font-bold text-green-400">
            Take Home Salary: ${takeHomeSalary.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncomeManager;