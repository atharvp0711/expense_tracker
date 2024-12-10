import React , {useState , useEffect} from 'react';
import "./Expenses.css";
import ReactModal from 'react-modal';
import RecentTransactions from "./RecentTransactions";

const Expenses = ({walletBalance, setWalletBalance, expenses,setExpenses}) => {
    
  // const [expenses , setExpenses] = useState([]);
  const [expenseTitle , setExpenseTitle] = useState('');
  const [expensePrice , setExpensePrice] = useState('');
  const [isModalOpen , setIsModalOpen] = useState(false);
  const [expenseCategory , setExpenseCategory] = useState('');
  const [expenseDate , setExpenseDate] = useState('') ; 
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const savedExpensesRaw = localStorage.getItem("expenses");
    const savedExpenses = savedExpensesRaw ? JSON.parse(savedExpensesRaw) : [];
    setExpenses(savedExpenses);

    const total = savedExpenses.reduce((sum,expense) => sum + expense.price , 0);
    setTotalExpense(total);
  } , [])

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setExpenseTitle('');
    setExpensePrice('');
    setExpenseCategory('');
    setExpenseDate('')
  }

  const handleAddExpense = (e) => {

      e.preventDefault() ; 

      const price = parseInt(expensePrice , 10);
      const titlePattern = /^[A-Za-z\s]+$/;

      let inputDate = new Date(expenseDate);
      let currDate = new Date();

      if (!expenseTitle || !expenseCategory || !expenseDate || !expensePrice) {
        alert("Please fill out all fields.");
        return;
    }
      if(!expenseDate || inputDate > currDate || isNaN(inputDate.getTime())){
        alert("Please enter a valid date");
        return ;
      }
      
      if(!price || price <=0 || isNaN(price)){
        alert("Please enter a valid price greater than zero");
        return;
      }
      
      if(price > walletBalance){
        alert("Expenses exceeds wallet balance!");
        return ; 
      }

      if (!titlePattern.test(expenseTitle)) {
        alert("Expense title must only contain letters and spaces.");
        return;
    }  

      //Adding expense
      const expense = {
        title: expenseTitle,
        price,
        category: expenseCategory,
        date: expenseDate,        
      };

      // Update expenses state in App.js 

      setExpenses((prev) => [...prev, expense]);

      // Updating wallet balance and total expenses

      const newWalletBalance = walletBalance - price; 
      setWalletBalance(newWalletBalance);

      const newTotalExpense = totalExpense + price;
      setTotalExpense(newTotalExpense);

      // Save expenses and wallet balance to LocalStorage
      localStorage.setItem("expenses" , JSON.stringify([...expenses, expense]));
      localStorage.setItem("walletBalance", newWalletBalance);

      closeModal();
    };

  return (
    <div className = "expenses">
        <h3> Expenses: ₹{totalExpense} </h3>      
        <button className = "expense" onClick={openModal}> + Add Expense </button>

        <ReactModal
        className = "modal"
        isOpen = {isModalOpen}
        onRequestClose={closeModal}
        overlayClassName= "overlay"
        >
          <h2> Add Expense </h2>
          <form>
            <div className='expenseDiv'>
              <div className='titlePrice'>
                <label> Title: </label>
                <input
                id='expenseTitle'
                type='text'
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                placeholder='Title'
                // required
                />
                <label> Price: </label>
                <input
                id='expensePrice'
                type='number'
                value={expensePrice}
                onChange={(e) => setExpensePrice(e.target.value)}
                placeholder='Price'
                // required
                />
              </div>
              <div className='categoryDate'>
                <label> Category: </label>
                <select
                id = "expenseCategory"
                value= {expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                // required
                >
                  <option value = ""> Select Category </option>
                  <option value = "Bills"> Bills </option>
                  <option value = "Entertainment"> Entertainment </option>
                  <option value = "Food"> Food </option>
                  <option value = "Health"> Health </option>
                  <option value = "Maintenance"> Maintenance </option>
                  <option value = "Transportation"> Transportation </option>
                  <option value = "Miscellaneous"> Miscellaneous </option>
                </select>
                <label> Date: </label>
                <input
                id='expenseDate'
                type='date'
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                placeholder='DD/MM/YYYY'
                // required
                />
              </div>
            </div>
            <div className = "expenseModalButtons">
              <button className = "expenseButton" type = "submit" onClick={handleAddExpense}> Add Expense </button>
              <button className = "cancelButton" onClick={closeModal}> Cancel </button>
            </div>
          </form>
        </ReactModal>
    </div>
  );
};

export default Expenses;
