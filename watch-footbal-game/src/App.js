import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    game: 'Chelsea',
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    game: 'Barcelona',
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    game: 'Bayern Munich',
  },
];

function Button({ children, onClick }) {
  return (
    <button
      className="button"
      onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  const [friends, setFriends] = useState(initialFriends);

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((curr) => !curr);
  }

  function handleSelectFriend(friend) {
    // setSelectedFriend(friend);

    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);

    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>
      <FormChooseGame selectedFriend={selectedFriend} />
    </div>
  );
}

function FriendList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((fr) => (
        <Friend
          friend={fr}
          key={fr.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img
        src={friend.image}
        alt={friend.name}></img>
      <h3>{friend.name}</h3>

      <p>
        {friend.name} wants to watch {friend.game}
      </p>

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');
  const [game, setGame] = useState('');

  function handleAddFriend(e) {
    e.preventDefault();

    if (!name || !image) {
      return;
    }

    const newFriend = { name, image, id: crypto.randomUUID, game };

    onAddFriend(newFriend);

    setImage('');
    setName('');
    setGame('');
  }

  return (
    <form
      className="form-add-friend"
      onSubmit={handleAddFriend}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Friend game</label>
      <input
        type="text"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      />

      <label>Friend image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormChooseGame({ selectedFriend }) {
  const [game, setGame] = useState('');

  const canWatch = selectedFriend?.game === game;

  return (
    <form className="form-split-bill">
      <label>Which match you want to watch?</label>
      <input
        type="text"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      />
      <label>Friend to watch with</label>
      <input
        type="text"
        disabled
        value={selectedFriend?.name}
      />
      <p>
        {canWatch
          ? 'You can watch the game together'
          : 'Your friend doesnt want to watch that game!'}
      </p>
    </form>
  );
}
