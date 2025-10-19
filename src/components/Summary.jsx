import { useContext } from "react";
import { ResultsContext } from "../results/results-context";
import quiz_complete from "../assets/quiz-complete.png";
import QUESTIONS from "../data/questions.js";

export default function Summary() {
  const { answers } = useContext(ResultsContext);

  const { skipped, correct, incorrect } = answers.reduce(
    (acc, { answer, isCorrect }) => {
      if (answer === null) acc.skipped++;
      else if (isCorrect) acc.correct++;
      else acc.incorrect++;
      return acc;
    },
    { skipped: 0, correct: 0, incorrect: 0 }
  );

  const total = answers.length;

  const skippedPercentage = Math.round((skipped / total) * 100);
  const correctPercentage = Math.round((correct / total) * 100);
  const incorrectPercentage = Math.round((incorrect / total) * 100);

  return (
    <div id="summary">
      <img src={quiz_complete}></img>
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <div className="stat">
          <p className="number">{skippedPercentage}%</p>
          <p className="text">Skipped</p>
        </div>
        <div className="stat">
          <p className="number">{correctPercentage}%</p>
          <p className="text">Answered Correctly</p>
        </div>
        <div className="stat">
          <p className="number">{incorrectPercentage}%</p>
          <p className="text">Answered Incorrectly</p>
        </div>
      </div>

      <ol>
        {answers.map((answer, index) => {
          const className =
            answer.answer === null
              ? "skipped"
              : answer.isCorrect
              ? "correct"
              : "wrong";

          const questionValue = QUESTIONS.find(
            (question) => question.id === answer.id
          )?.text;

          const answerValue =
            answer.answer === null ? "Skipped" : answer.answer;

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <div className="question">{questionValue}</div>
              <div className={`user-answer ${className}`}>{answerValue}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
