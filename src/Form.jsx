import React, { useState } from 'react';

const Form = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    name: '',
    description: '',
    category: '',
    amount: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.name && expense.amount) {
      onAddExpense(expense);
      setExpense({
        name: '',
        description: '',
        category: '',
        amount: '',
        date: '',
      });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="name">Expense Name</label>
        <input
          type="text"
          name="name"
          value={expense.name}
          onChange={handleChange}
          placeholder="Expense Name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={expense.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={expense.category}
          onChange={handleChange}
          placeholder="Category"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-button">Add Expense</button>
    </form>
  );
};

export default Form;
