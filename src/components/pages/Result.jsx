import { useLocation, useParams } from "react-router-dom";
import Analysis from "../Analysis";
import useAnswersList from "../../hooks/useAnswers";
import _ from "lodash";
import Summary from "../Summary";
const Result = () => {
  const { id } = useParams();
  const location = useLocation();
  const { qna } = location.state;
  const { isloading, error, answers } = useAnswersList(id);

  const calculate = () => {
    let score = 0;
    if (answers) {
      answers.forEach((question, index1) => {
        let correctIndexes = [];
        let checkedIndexes = [];
        question.options.forEach((option, index2) => {
          if (option.correct) {
            correctIndexes.push(index2);
          }
          if (qna[index1].options[index2].checked) {
            checkedIndexes.push(index2);
            option.checked = true;
          }
        });
        if (_.isEqual(correctIndexes, checkedIndexes)) {
          score = score + 5;
        }
      });
    }
    return score;
  };
  const score = calculate();
  return (
    <>
      {isloading && <div>loading....</div>}
      {error && <div>{error.message}</div>}
      {!isloading && !error && answers.length > 0 && (
        <>
          <Summary score={score} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
};

export default Result;
