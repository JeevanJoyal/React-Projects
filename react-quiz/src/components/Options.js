export default function Options({question, dispatch, answer}) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
        {console.log("In Options")}
        
        {question.options.map((option, index) => (
            <button 
              className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === answer ? "correct" : "wrong") : ""}` }
              key={option} 
              disabled={hasAnswered}
              onClick={()=>dispatch({type:"newAnswer", payLoad: index})}
            >
              {option}
            </button>
        ))}
      </div>
  )
}
