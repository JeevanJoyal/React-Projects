import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion data = {faqs}/>
    </div>
  );
}

function Accordion({data}) {
  const [curr, setCurr] = useState(0);

  return <div className="accordion" key="Accordion">
    {data.map((item, idx) => <AccordionItem curr={curr} setCurr={setCurr} num={idx} title={item.title} text={item.text} key={idx+1}/>)}
  </div>;
}

function AccordionItem({curr, setCurr, num, title, text}){
  // const [isOpen, setIsOpen] = useState(false);

  return <div className={curr===num+1 ? "open item": "item"} onClick={() => setCurr(num+1)} >
    <p className="number">{num <= 9 ? `0${num+1}` : num+1}</p>
    <p className="title">{title}</p>
    <p className="icon">{curr===num+1 ? '-' : '+'}</p>
    {curr===num+1 && <p className="content-box">{text}</p>}
  </div>
}
