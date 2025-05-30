import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [myTip, setMyTip] = useState(0);
  const [myFriendTip, setMyFriendTip] = useState(0);

  function reset(){
    setBill(0);
    setMyTip(0);
    setMyFriendTip(0);
  }

  return (
    <div className="App">
      <Bill bill={bill} onChangeBill={setBill} myTip={myTip} onChangeMyTip={setMyTip} myFriendTip={myFriendTip} onChangeMyFriendTip={setMyFriendTip} />
      <MySatisfaction bill={bill} onChangeBill={setBill} myTip={myTip} onChangeMyTip={setMyTip} myFriendTip={myFriendTip} onChangeMyFriendTip={setMyFriendTip}/>
      <MyFriendSatisfaction bill={bill} onChangeBill={setBill} myTip={myTip} onChangeMyTip={setMyTip} myFriendTip={myFriendTip} onChangeMyFriendTip={setMyFriendTip}/>
      <Result bill={bill} onChangeBill={setBill} myTip={myTip} onChangeMyTip={setMyTip} myFriendTip={myFriendTip} onChangeMyFriendTip={setMyFriendTip}/>
      <Reset onClick={reset}/>
    </div>
  );
}

function Bill(props){
  return (
    <div>
      <p>How Much was the bill? <input onChange={(e) => props.onChangeBill(e.target.value)} value={props.bill}></input></p>
    </div>
  );
}

function MySatisfaction(props){
  return (
    <div>
      <p>How did you like the service?
        <select value={props.myTip} onChange={(e) => props.onChangeMyTip(e.target.value)}>
          <option value={0}> Dissatisfied (0%)</option>
          <option value={5}> It is Ok (5%)</option>
          <option value={10}> It is Good (10%)</option>
          <option value={20}> Absolutely Amazing (20%)</option>
        </select>
      </p>
    </div>
  );
}

function MyFriendSatisfaction(props){
  return (
    <div>
      <p>How did your friend like the service?
        <select value={props.myFriendTip} onChange={(e) => props.onChangeMyFriendTip(e.target.value)}>
          <option value={0}> Dissatisfied (0%)</option>
          <option value={5}> It is Ok (5%)</option>
          <option value={10}> It is Good (10%)</option>
          <option value={20}> Absolutely Amazing (20%)</option>
        </select>
      </p>
    </div>
  );
}

function Result(props){
  return (
    <h2>{`You pay ${"$"+props.bill} (${"$"+props.bill}+ ${"$" + calTip(props.bill, Number(props.myTip), Number(props.myFriendTip))} tip)`}</h2>
  );
}
function calTip(bill, a, b){
  console.log(bill,a,b, (a+b)/2)
  return Math.round(bill * ((a+b)/2)/100);
}

function Reset({onClick}){
  return (<button onClick={onClick}>Reset</button>);
}