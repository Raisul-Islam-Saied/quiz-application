import { Fragment } from "react";
import Answer from "./Answer";
import style from "./styles/Answers.module.css";

// eslint-disable-next-line react/prop-types
const Answers = ({ onHandleChange, options = [], input }) => {
  // options.map((option) => console.log(option.checked));
  return (
    <div className={style.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <Answer
              key={index}
              id={index}
              value={index}
              checked={option.checked}
              onChange={(e) => onHandleChange(e, index)}
            >
              {option.title}
            </Answer>
          ) : (
            <Answer
              key={index}
              id={index}
              className={
                option.correct ? "correct" : option.checked ? "wrong" : null
              }
              defaultChecked={option.checked}
              disabled
            >
              <span> {option.title}</span>
              {option.correct && option.checked ? (
                <span>correct</span>
              ) : (
                option.checked && <span>your answer</span>
              )}
            </Answer>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Answers;
