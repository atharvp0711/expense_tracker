import React, { createContext, useState, useEffect } from "react";

// Create context
export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  // Initial state
  const [walletBalance, setWalletBalance] = useState(() => {
    return JSON.parse(localStorage.getItem("walletBalance")) || 5000;
  });

  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  // Update localStorage whenever walletBalance or expenses change
  useEffect(() => {
    localStorage.setItem("walletBalance", JSON.stringify(walletBalance));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  // Add expense and update balance
  const addExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    setWalletBalance((prev) => prev - newExpense.amount);
  };

  // Edit an expense and update balance
  const editExpense = (id, updatedAmount) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? { ...expense, amount: updatedAmount } : expense
    );
    const previousAmount = expenses.find((expense) => expense.id === id).amount;
    setExpenses(updatedExpenses);
    setWalletBalance((prev) => prev + previousAmount - updatedAmount);
  };

  return (
    <WalletContext.Provider
      value={{ walletBalance, expenses, addExpense, editExpense }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
