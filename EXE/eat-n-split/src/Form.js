import { useState } from 'react';
import Button from './Button';

function Form({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [expense, setExpense] = useState('');
  const [whoPays, setWhoPays] = useState('user');

  const friendExpense = bill ? bill - expense : '';

  if (!selectedFriend) {
    return;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !expense) {
      return;
    }

    onSplitBill(whoPays === 'user' ? friendExpense : -expense);
  }

  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Bill value</label>
      <input
        type='text'
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>Your expense</label>
      <input
        type='text'
        value={expense}
        onChange={(e) => setExpense(Number(e.target.value))}
      />
      <label>{`${selectedFriend.name}'s`} expense</label>
      <input type='text' disabled value={friendExpense} />
      <label>Who is paying the bill</label>
      <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button className='button'>Split bill</Button>
    </form>
  );
}

export default Form;
