import React, { PureComponent } from 'react';

class Expenses extends PureComponent {
  render() {
    const { records } = this.props; // Destructure records from props

    return (
      <>
        <h1>EXPENSE TRACKER</h1>
        <p>Keep track of your spending and manage your finances with ease. Stay on top of your budget and make smarter financial decisions every day!</p>

        {records.length > 0 ? (
          <div className="records-container">
            <h3>Expense Records</h3>
            <ul>
              {records.map((record, index) => (
                <li key={index}>
                  <strong>{record.name}</strong> - {record.description}, {record.category}, ksh {record.amount}, {record.date}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No expenses added yet!</p>
        )}
      </>
    );
  }
}

export default Expenses;
