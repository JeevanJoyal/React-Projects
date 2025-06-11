import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  const [openForm, setOpenForm] = useState(false)
  const [friends, setFriends] = useState(initialFriends);
  const [selected, setSelected] = useState(0)

  function handleAddFriendButton() {
    setOpenForm(!openForm)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onFriends={setFriends} selected={selected} onSelected={setSelected}/>
        <FormAddFriend friends={friends} onFriends={setFriends} openForm={openForm} onOpenForm={setOpenForm}/>
        <Button openForm={openForm} onClicked={handleAddFriendButton} onClick={() => setOpenForm(!openForm)}>{openForm ? "Close": "Add Friend"}</Button>
      </div>
      
      {selected !== 0 && <FormSplitBill onSelected = {setSelected} friends={friends} key={selected} onFriends={setFriends} selectedFriend={friends.filter( (friend) => friend.id === selected, [0])[0]}/> }
      
    </div>
  );
}

function FriendList({friends, onFriends, selected, onSelected}) {
  

  return <ul>
    {friends.map((friend => (
      <Friend friend={friend} key={friend.id} onSelected={onSelected} selected={selected} />
    )))}
  </ul>
}

function Friend({ friend, selected, onSelected}) {

  function handleSelected() {
    onSelected(selected === friend.id ? 0 : friend.id)
    // console.log(friend.id)

  }

  return <li className={selected === friend.id ? "selected" : ""}>
    <img src={friend.image} alt={friend.name}></img>
    <h3>{friend.name}</h3>

    {friend.balance < 0 && (<p className="red">
      You owe {friend.name} {Math.abs(friend.balance)}$
    </p>)}

    {friend.balance > 0 && (<p className="green">
      {friend.name} owes you {Math.abs(friend.balance)}$
    </p>)}

    {friend.balance === 0 && (<p>
      {friend.name} owes you nothing
    </p>)}

    <Button onClicked={handleSelected}>{selected === friend.id ? "Close" : "Select"}</Button>
  </li>
}

function FormAddFriend({ openForm, friends ,onFriends }) {
  const [name, setName] = useState("");
  const [imgURL, setImgURL] = useState("https://i.pravatar.cc/48"); 

  function handleSubmit(e){
    e.preventDefault();

    if (!name || !imgURL) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name : name, 
      image : `${imgURL}?=${id}`, 
      balance: 0
    };

    onFriends([...friends, newFriend])

    setName("")
    setImgURL("https://i.pravatar.cc/48")
  }

  return ( openForm && <form className="form-add-friend">
    <label>🏷️Friend name</label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

    <label>🏷️Image URL</label>
    <input type="text" value={imgURL} onChange={(e) => setImgURL(e.target.value)}/>

    <Button onClicked={handleSubmit}>Add</Button>
  </form>);
}

function Button({children, onClicked}){
  return <button className="button" onClick={onClicked}>{children}</button>
}

function FormSplitBill({onSelected,friends, selectedFriend, onFriends}) {
  const [bill, setBill] = useState(0)
  const [yourExpense, setYourExpense] = useState(0)
  const [payer, setPayer] = useState("me")

  function handleSplitBill(e){
    

    let frdBalance = selectedFriend.balance
    payer === "me" ? frdBalance += bill - yourExpense : frdBalance -= bill - yourExpense
    
    let newFriend = {...selectedFriend, balance: frdBalance}
    onFriends([...friends.filter((frd) => frd.id !== newFriend.id), newFriend])
    onSelected(0)
  }
   
  return (
    <form className="form-split-bill" >
      <h2> Split a bill with {selectedFriend.name}</h2>

      <label>🏷️Bill value</label>
      <input 
      type="text"
      value={bill}
      onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🏷️Your expense</label>
      <input 
      type="text"
      value={yourExpense}
      onChange={(e) => setYourExpense(Number(e.target.value))}
      />

      <label>🏷️{selectedFriend.name}'s expense</label>
      <input type="text" value={bill-yourExpense} disabled/>

      <label>🏷️ who is paying the bill</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="user">me</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button onClicked={handleSplitBill}>Split bill</Button>
    </form>)
}