import { useState } from 'react';
import Expenses from './Expenses';
//import Form from './Form';
import './App.css';

function App() {
  const [records, setRecords] = useState([]);

  const handleAddExpense = (expense) => {
    setRecords((prev) => [...prev, expense]);
  };

  return (
    <div className="app-layout"> {/* Flex container */}
       <Expenses records={records} />  {/* Left side */}
    </div>
  );
}

export default App;



