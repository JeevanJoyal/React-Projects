import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./components/NextButton";
import Progess from "./components/Progess";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [], 
  status: "loading", 
  index: 0, 
  answer : null,
  points : 0,
  highscore : 0,
  secondsRemaining: 10
}

function reducer(state, action) {
  switch(action.type){
    case "dataRecieved":
      return {...state, questions: action.payLoad, status: "ready"}
    case "dataFailed":
      return {...state, status: "error"}
    case "start":
      return {...state, status:"active", secondsRemaining : state.questions.length * SECS_PER_QUESTION}
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state, 
        answer: action.payLoad, 
        points: action.payLoad === question.correctOption ? state.points + question.points + 1: state.points,
      }
    case "nextQuestion":
      return {...state, index : state.index+1, answer: null};
    case "finish":
      return {...state, status: "finished", highscore : state.points > state.highscore ? state.points : state.highscore}
    case "restart":
      return {...initialState,questions:state.questions, highscore: state.highscore, status: "ready"};
    case "tick": 
      return {...state, secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished": state.status
      }
    default: 
      throw new Error("Action Unknown");
  }
}

function App(){
  const [{questions, status, index, answer, highscore,secondsRemaining, points}, dispatch] = useReducer(reducer, initialState);
  const maxPossiblePoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(function() {
    fetch("http://localhost:8000/questions")
    .then((res) => res.json())
    .then((data) => dispatch({type: "dataRecieved", payLoad: data}))
    .catch((err) => dispatch({type: "dataFailed"}))
  }, []);

  return <div className="app">
    <Header />

    <Main>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen numQuestions={questions.length} dispatch={dispatch}/>}
      {status === "active" && (
        <>
          <Progess index={index} numQuestion={questions.length} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}></Progess>
          <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}></Timer>
            <NextButton dispatch={dispatch} answer={answer} numQuestion={questions.length} index={index}></NextButton> 
          </Footer>
          
        </>
      )}
      {status === "finished" && <FinishScreen dispatch={dispatch} points={points} highscore={highscore} maxPossiblePoints={maxPossiblePoints}></FinishScreen>}
    </Main>
  </div>
}

export default App;