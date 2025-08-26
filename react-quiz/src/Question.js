import Options from "./components/Options";

export default function Question({question, answer, dispatch}) {
  return (
    <div>
      {console.log("In Questions")}
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
 