import React from "react";
import "./App.css";
import ReactModal from "react-modal";
import ExpenseTracker from "./ExpenseTracker";
import Expenses from "./Components/Expenses";
import ExpenseSummary from "./Components/ExpenseSummary";
import RecentTransactions from "./Components/RecentTransactions";
import TopExpenses from "./Components/TopExpenses"; // Placeholder for future code

ReactModal.setAppElement("#root");

const App = () => {
  const [walletBalance, setWalletBalance] = React.useState(5000); // Example balance
  const [expenses, setExpenses] = React.useState([]);

  return (
    <div className="app-container">
      {/* Header Section */}
      <header>
        <h1>Expense Tracker</h1>
      </header>

      {/* Wallet, Expenses, and Summary Section */}
      <div className="tracker-container">
        <ExpenseTracker
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
        />
        <Expenses
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
          expenses={expenses}
          setExpenses={setExpenses}
        />
        <ExpenseSummary expenses={expenses} />
      </div>

      {/* Recent Transactions and Top Expenses Section */}
      <main className="transactions-container">
        {/* <div className="recent-transactions">
        </div> */}
        <RecentTransactions transactions={expenses} />
        <div className="top-expenses">
          <TopExpenses />
        </div>
      </main>
    </div>
  );
};

export default App;
