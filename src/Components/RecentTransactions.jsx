import React, { useState } from "react";
import "./RecentTransactions.css";
import { TiDeleteOutline } from "react-icons/ti";
import { MdEdit } from "react-icons/md";


const RecentTransactions = ({ transactions }) => {
  console.log("Transactions received in RecentTransactions:", transactions);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Sort transactions by date (latest to oldest)
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Paginate transactions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = sortedTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  // Pagination controls
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const deleteExpenseFunction = () => {
    
  }

  return (
    <div className="recent-transactions">
      <div>
        <h2>Recent Transactions</h2>
      </div>
      <div className="transactions-list">
        {currentTransactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <div className="transaction-icon">
              <img src={transaction.icon || "default-icon.png"} alt={transaction.title} />
            </div>
            <div className="transaction-details">
              <p className="transaction-title">{transaction.title}</p>
              <p className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
            <div className = "amount-icons">
              <div className="transaction-amount">₹{transaction.price} </div>
              <div className = "icons">
                <TiDeleteOutline size={30} onClick={deleteExpenseFunction} />
                <MdEdit size={30} onClick={modifyExpenseFunction} style={{marginLeft : "10px"}} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          ←
        </button>
        <h3>{currentPage}</h3>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          →
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;
