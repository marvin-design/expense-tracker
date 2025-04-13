import React, { PureComponent } from 'react';
import Form from './Form';


class Expenses extends PureComponent {
  constructor(props) {
    super(props);
    const savedRecords = localStorage.getItem('expenseRecords');
    const savedSearch = localStorage.getItem('expenseSearch') || '';
    this.state = {
      records: savedRecords ? JSON.parse(savedRecords) : [],
      editingIndex: null,
      searchTerm: savedSearch,
    };
  }

  saveToLocalStorage = (records) => {
    localStorage.setItem('expenseRecords', JSON.stringify(records));
  };

  handleAddExpense = (expense) => {
    const { editingIndex, records } = this.state;

    if (editingIndex !== null) {
      const updated = [...records];
      updated[editingIndex] = expense;
      this.setState(
        { records: updated, editingIndex: null },
        () => this.saveToLocalStorage(this.state.records)
      );
    } else {
      const updated = [...records, expense];
      this.setState({ records: updated }, () => this.saveToLocalStorage(updated));
    }
  };

  handleDelete = (index) => {
    const updated = this.state.records.filter((_, i) => i !== index);
    this.setState({ records: updated }, () => this.saveToLocalStorage(updated));
  };

  handleEdit = (index) => {
    this.setState({ editingIndex: index });
  };

  handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    localStorage.setItem('expenseSearch', value);
    this.setState({ searchTerm: value });
  };

  render() {
    const { records, editingIndex, searchTerm } = this.state;

    const filteredRecords = records.filter((record) =>
      [record.name, record.description, record.category]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm)
    );

    return (
      <div className="expenses-page">
        <div className="header">
          <h1 className="title">EXPENSE TRACKER</h1>
          <p className="tracker-description">
            Keep track of your spending and manage your finances with ease.
            Stay on top of your budget and make smarter financial decisions every day!
          </p>
        </div>

        <div className="main-content">
          <div className="left-panel">
            <Form
              onAddExpense={this.handleAddExpense}
              initialExpense={records[editingIndex]}
              onCancelEdit={() => this.setState({ editingIndex: null })}
            />

            <input
              type="text"
              placeholder="Search expenses..."
              onChange={this.handleSearch}
              value={searchTerm}
              className="search-bar"
            />
          </div>

          <div className="records-table-container">
            {filteredRecords.length > 0 ? (
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.name}</td>
                      <td>{record.description}</td>
                      <td>{record.category}</td>
                      <td>Ksh {record.amount}</td>
                      <td>{record.date}</td>
                      <td>
                        <button className="edit-button" onClick={() => this.handleEdit(index)}>Edit</button>
                        <button className="delete-button" onClick={() => this.handleDelete(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No matching expenses found.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Expenses;
