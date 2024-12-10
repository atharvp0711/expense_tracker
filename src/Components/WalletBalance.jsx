import React , {useState , useEffect} from 'react';
import ReactModal from 'react-modal';
import "./WalletBalance.css";

const WalletBalance = ({walletBalance , setWalletBalance}) => {

    // const [walletBalance , setWalletBalance] = useState(5000);
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [incomeAmount , setIncomeAmount] = useState(""); 
  
  // Loading the Wallet Balance from Local Storage on Component Mount

    useEffect(() => {
      const savedBalance = localStorage.getItem("walletBalance");
      if(savedBalance){
        setWalletBalance(parseInt(savedBalance , 10));
      }
    } , [setWalletBalance]);  //includes setWalletBalance to avoid re-renders

  // Save Wallet Balance to local storage whenever it changes

    useEffect(() => {
      localStorage.setItem("walletBalance" , walletBalance);
    } , [walletBalance])


  // Opening the Modal

    const openModal = () => {
      setIsModalOpen(true) ;
    };

  // Closing the Modal
    const closeModal = () => {
      setIsModalOpen(false);
      setIncomeAmount("");
    };

  // Adding income to Wallet Balance
    const handleAddIncome = () => {
      const amount = parseInt(incomeAmount , 10);

      if(isNaN(amount) || amount <= 0){
        alert("Please enter a valid amount to add");
        return ; 
      }
      
      setWalletBalance((prev) => {
        const updatedBalance = prev + amount
        localStorage.setItem("walletBalance", updatedBalance); // Sync immediately to localStorage
        return updatedBalance;
      }) ; // update parent state
      closeModal() ;
    }

  return (
    <div className = "walletBalance">
        <h3> Wallet Ballance: ₹{walletBalance} </h3>      
        <button className = "income" onClick = {openModal}> + Add Income </button>
        <ReactModal 
        className = "modal"
        isOpen = {isModalOpen}
        onRequestClose={closeModal}
        overlayClassName= "overlay"
        >
          <h2> Add Balance </h2>
          <form>
            <label> Income Amount: </label>
            <input
            id = "incomeAmount"
            type = "number"
            value = {incomeAmount}
            onChange = {(e) => setIncomeAmount(e.target.value) }
            placeholder = "Enter amount"
            />
          </form>
          <button className = "addIncomeBtn" onClick = {handleAddIncome}> Add Balance</button>
          <button className = "cancelBtn" onClick = {closeModal}> Cancel </button>
        </ReactModal>
    </div>
  )
}

export default WalletBalance
