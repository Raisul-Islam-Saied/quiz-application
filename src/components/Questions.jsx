import Answers from "./Answers";
import style from "./styles/Questions.module.css";
const Questions = ({ answers = [] }) => {
  return answers.map((answer, index) => (
    <div className={style.questions} key={index}>
      <div className={style.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>
      <Answers options={answer.options} input={false} />
    </div>
  ));
};

export default Questions;
