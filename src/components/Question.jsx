import { useEffect, useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import ANSWERS from "../data/answers.js";
import { QuestionProgress } from "./misc/QuestionProgress.jsx";

const DEFAULT_TIMER = 10000;
const SHORT_TIMER = 1500;

export default function Question({ id, title, answers, onFinishedAnswer }) {
  const [currentQuestionState, setCurrentQuestionState] = useState(
    QuestionProgress.WAITING
  );
  const [currentTimer, setCurrentTimer] = useState(DEFAULT_TIMER);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [answerClasses, setAnswerClasses] = useState("");
  const isCorrect = ANSWERS.some(
    (answer) => answer.id === id && answer.answer === currentAnswer
  );

  function handleSelectAnswer(selectedAnswer) {
    setCurrentAnswer(selectedAnswer);
    setCurrentQuestionState(QuestionProgress.SUBMITTING);
  }

  function handleSubmitAnswer() {
    setCurrentQuestionState(QuestionProgress.VERIFYING);
  }

  function handleVerifyQuestion() {
    setCurrentQuestionState(QuestionProgress.PREPARINGNEXT);
  }

  function handlePrepareNextQuestion() {
    setCurrentQuestionState(QuestionProgress.WAITING);
  }

  function handleTimeExpired() {
    setCurrentQuestionState(QuestionProgress.VERIFYING);
  }

  useEffect(() => {
    switch (currentQuestionState) {
      case QuestionProgress.SUBMITTING:
        setAnswerClasses("selected");
        setCurrentTimer(SHORT_TIMER);
        break;

      case QuestionProgress.VERIFYING:
        setAnswerClasses(isCorrect ? "correct" : "wrong");
        setCurrentTimer(SHORT_TIMER);
        break;

      case QuestionProgress.PREPARINGNEXT:
        onFinishedAnswer(id, currentAnswer, isCorrect);
        setCurrentTimer(0);
        break;

      case QuestionProgress.WAITING:
        setCurrentAnswer(null);
        setAnswerClasses("");
        setCurrentTimer(DEFAULT_TIMER);
        break;
    }
  }, [currentQuestionState]);

  return (
    <div id="question">
      <QuestionTimer
        timer={currentTimer}
        questionState={currentQuestionState}
        onSubmitAnswer={handleSubmitAnswer}
        onVerifyAnswer={handleVerifyQuestion}
        onPrepareNextQuestion={handlePrepareNextQuestion}
        onTimeExpired={handleTimeExpired}
      />
      <h2>{title}</h2>
      <div className="answer">
        <div id="answers">
          {answers.map((answer, index) => {
            return (
              <button
                className={answer === currentAnswer ? answerClasses : ""}
                onClick={() => handleSelectAnswer(answer)}
                disabled={
                  currentAnswer != null ||
                  currentQuestionState === QuestionProgress.VERIFYING
                }
                key={index}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
