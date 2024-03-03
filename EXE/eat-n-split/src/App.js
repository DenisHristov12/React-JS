import { useState } from 'react';
import Form from './Form';
import Sidebar from './Sidebar';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);

  const [showAddFriend, setShowAddFriend] = useState(false);

  const [selectFriend, setSelectFriend] = useState(null);

  function handleSelectFriend(friend) {
    setSelectFriend((selected) =>
      selected?.id === friend?.id ? null : friend
    );
  }

  function handleShowAddFriend() {
    setShowAddFriend((curr) => !curr);
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);

    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectFriend(null);
  }

  return (
    <div className='app'>
      <Sidebar
        friends={friends}
        showAddFriend={showAddFriend}
        onSelectFriend={handleSelectFriend}
        selectedFriend={selectFriend}
        onShowAddFriend={handleShowAddFriend}
        onAddFriend={handleAddFriend}
      />

      <Form
        onSplitBill={handleSplitBill}
        selectedFriend={selectFriend}
        key={selectFriend?.id}
      />
    </div>
  );
}

export default App;
