import "./index.css";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <StepCounter />
    </div>
  );
}

function StepCounter() {
  const [step, setStep] = useState(0);
  return (
    <div>
      <button onClick={() => setStep((step) => step - 1)}>-</button>
      <p>Step: {step}</p>
      <button onClick={() => setStep((step) => step + 1)}>+</button>
      <Counter parentStep={step} />
    </div>
  );
}
function Counter({ parentStep }) {
  const [step, setStep] = useState(0);
  return (
    <div>
      <button onClick={() => setStep((step) => step - parentStep)}>-</button>
      <p>Count: {step}</p>
      <button onClick={() => setStep((step) => step + parentStep)}>+</button>
      <Result parentStep={step} />
    </div>
  );
}

function Result({ parentStep }) {
  const d = new Date();
  d.setDate(d.getDate() + parentStep);
  if (parentStep == 0) {
    return <h3>Today is {d.toDateString()}</h3>;
  } else if (parentStep < 0) {
    return (
      <h3>
        {parentStep} days ago {d.toDateString()}
      </h3>
    );
  } else {
    return (
      <h3>
        {parentStep} days after {d.toDateString()}
      </h3>
    );
  }
}
