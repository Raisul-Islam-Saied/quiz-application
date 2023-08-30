import Questions from "./Questions";

// eslint-disable-next-line react/prop-types
const Analysis = ({answers}) => {
  return (
    <div className="analysis">
      <h1>Pick three of your favorite Star Wars Flims</h1>
      <h4>Question can have multiple answers</h4>
      <Questions answers={answers} />
    </div>
  );
};

export default Analysis;
