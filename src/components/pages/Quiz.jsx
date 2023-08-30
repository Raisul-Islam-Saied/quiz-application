import { useEffect, useReducer, useState } from "react";
import _ from "lodash";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useQuestionList from "../../hooks/useQuestionList";
import Answers from "../Answers";
import { useAuth } from "../../context/authContext";
import MiniPlayer from "../MiniPlayer";
import ProgerssBar from "../progerssBar";
import { getDatabase, ref, set } from "firebase/database";

const QUESTION = "QUESTION";
const ANSWER = "ANSWER";
const initiaState = {
  questions: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case QUESTION:
      action.payload.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return {
        ...state,
        questions: action.payload,
      };
    case ANSWER:
      // eslint-disable-next-line no-case-declarations
      const questions = _.cloneDeep(state.questions);
      questions[action.questionId].options[action.optionIndex].checked =
        action.value;
      return {
        ...state,
        questions: questions,
      };
    default:
      return state;
  }
};

function Quiz() {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initiaState);
  const { isloading, error, questions } = useQuestionList(id);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (questions.length > 0) {
      dispatch({ type: QUESTION, payload: questions });
    }
  }, [questions, location]);
  const handleChange = (e, index) => {
    dispatch({
      type: ANSWER,
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  const next = () => {
    if (state.questions.length > currentQuestion + 1) {
      setCurrentQuestion((prevState) => prevState + 1);
    }
  };

  const prevButton = () => {
    if (currentQuestion >= 1) {
      setCurrentQuestion((prevState) => prevState - 1);
    }
  };

  const parcentage =
    state.questions.length > 0
      ? ((currentQuestion + 1) / state.questions.length) * 100
      : 0;

  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: state.questions,
    });

    navigate(`../result/${id}`, {
      state: {
        qna: state.questions,
      },
    });
  }

  return (
    <>
      {!isloading && !error && state.questions.length > 0 && (
        <>
          {" "}
          <div className="title">
            {true && <h1>{state.questions[currentQuestion].title}</h1>}
            <h4>Question can have multiple answers</h4>
          </div>
          <Answers
            options={state.questions[currentQuestion].options}
            onHandleChange={handleChange}
            input={true}
          />
          <ProgerssBar
            next={next}
            prev={prevButton}
            progress={parcentage}
            submit={submit}
          />
          <MiniPlayer id={id} title={location.state} />{" "}
        </>
      )}
      {isloading && <p>loading</p>}
      {error && <p>{error.message}</p>}
    </>
  );
}

export default Quiz;
