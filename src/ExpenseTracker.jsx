import React, {useState} from 'react';
import WalletBalance from './Components/WalletBalance';
import Expenses from './Components/Expenses';
import './ExpenseTracker.css';
// import RecentTransactions from "./Components/RecentTransactions";
// import TopExpenses from "./Components/TopExpenses";


const ExpenseTracker = () => {
    const walletBalanceRaw = localStorage.getItem("walletBalance");

    const [walletBalance, setWalletBalance] = useState(() => {
      const parsedBalance = parseInt(walletBalanceRaw, 10);
      return !isNaN(parsedBalance) && parsedBalance > 0 ? parsedBalance : 5000; // Default to 0 if invalid
    });

    React.useEffect(() => {
      if(!isNaN(walletBalance)){
        localStorage.setItem("walletBalance" , walletBalance);
      }
    }, [walletBalance]);
    
  return (
    <div className='expenseTracker'>
        <WalletBalance walletBalance = {walletBalance} setWalletBalance={setWalletBalance}/>
        {/* <Expenses walletBalance = {walletBalance} setWalletBalance = {setWalletBalance}/> */}
    </div>
  );
};

export default ExpenseTracker ;