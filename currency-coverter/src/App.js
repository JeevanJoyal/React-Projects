// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("1");
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("INR");
  return (
    <div>
      <Input input={input} onInput={setInput} />
      <CurrencyDrowdown currency={currency1} onCurrency={setCurrency1} />
      <CurrencyDrowdown currency={currency2} onCurrency={setCurrency2}/>
      <OutputText currency1={currency1} currency2={currency2} input={input}/> 
    </div>
  );
}

function CurrencyDrowdown({currency, onCurrency}){
  return (<select defaultValue={currency} onChange={(e) => onCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>);
}

function Input({input,onInput}){
  return (<input type="text" defaultValue={input} onChange={(e) => onInput(e.target.value)}/>);
}

function OutputText({currency1, currency2, input}){
  const [amount, setAmount] = useState(input);
  useEffect(function () {
    async function getCurrency() {
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${input}&from=${currency1}&to=${currency2}`);
      const json = await response.json();
      console.log(json);
      setAmount(json.rates[currency2]);
    }
    
    getCurrency();
  },[input, currency1, currency2])
  // console.log(amount);
  return <p>{amount} {currency2}</p>
}