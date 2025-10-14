import Question from "./Question";
import QUESTIONS from "../data/questions.js";
import { useContext, useEffect, useState } from "react";
import { ResultsContext } from "../results/results-context.jsx";

export default function Quiz({ onFinishQuiz }) {
  const { addAnswer } = useContext(ResultsContext);

  const [currentQuestionPosition, setCurrentQuestionPosition] = useState(0);
  const question = QUESTIONS.at(currentQuestionPosition);

  function handleFinishedAnswer(id, answer, isCorrect) {
    addAnswer(id, answer, isCorrect);
    setCurrentQuestionPosition((prev) => (prev += 1));
  }

  const hasQuizEnded = currentQuestionPosition > QUESTIONS.length - 1;

  useEffect(() => {
    if (hasQuizEnded) {
      onFinishQuiz();
    }
  }, [hasQuizEnded, onFinishQuiz]);

  return (
    <div id="quiz">
      {!hasQuizEnded && (
        <Question
          id={question.id}
          title={question.text}
          answers={question.answers}
          onFinishedAnswer={handleFinishedAnswer}
        />
      )}
    </div>
  );
}
