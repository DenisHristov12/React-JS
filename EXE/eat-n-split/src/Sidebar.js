import { useState } from 'react';
import Button from './Button';

function Sidebar({
  friends,
  selectedFriend,
  onSelectFriend,
  showAddFriend,
  onShowAddFriend,
  onAddFriend,
}) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) {
      return;
    }

    const id = crypto.randomUUID;

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName('');
    setImage('');
  }

  return (
    <div className='sidebar'>
      <ul>
        {friends.map((friend) => (
          <Friend
            selectFriend={selectedFriend}
            onSelectFriend={onSelectFriend}
            friend={friend}
            key={friend.id}
          />
        ))}
      </ul>

      {showAddFriend && (
        <form className='form-add-friend' onSubmit={handleSubmit}>
          <label>Friend name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Image URL</label>
          <input
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button>Add</Button>
        </form>
      )}

      <Button onClick={onShowAddFriend}>
        {showAddFriend ? 'Close' : 'Add friend'}
      </Button>
    </div>
  );
}

function Friend({ friend, selectFriend, onSelectFriend }) {
  const isSelected = selectFriend?.id === friend?.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        className={
          friend.balance !== 0 ? (friend.balance > 0 ? 'green' : 'red') : ''
        }>
        {friend.balance !== 0
          ? friend.balance > 0
            ? `${friend.name} owes you ${friend.balance}$`
            : `You owe ${friend.name} ${Math.abs(friend.balance)}$`
          : `You and ${friend.name} are even`}
      </p>
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

export default Sidebar;
