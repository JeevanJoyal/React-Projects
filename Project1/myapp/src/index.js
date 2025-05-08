import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import image from "./image.png";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <h1>Jonas schmedtmann</h1>
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList text="HTML+CSS 👍" backgroundColour="blue" />
        <SkillList text="Javascript 👍" backgroundColour="Yellow" />
        <SkillList text="web design 👍" backgroundColour="green" />
        <SkillList text="Git and Github 👍" backgroundColour="red" />
        <SkillList text="React 👍" backgroundColour="blue" />
        <SkillList text="UiPath 👍" backgroundColour="red" />
      </div>
    </div>
  );
}

function Avatar() {
  return <img src={image} />;
}

function Intro() {
  return <p>Full-stack web developer and teacher at Udemy. When not coding or
  preparing a course, I like to play board games, to cook (and eat), or to
  just enjoy the Portuguese sun at the beach.</p>;
}

function SkillList(props) {
  return (
    <button style={{ backgroundColor : props.backgroundColour}}>
      {props.text}
    </button>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
