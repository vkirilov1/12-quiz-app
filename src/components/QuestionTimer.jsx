import { useEffect, useState } from "react";
import { QuestionProgress } from "./misc/QuestionProgress";

export default function QuestionTimer({
  timer,
  questionState,
  onSubmitAnswer,
  onVerifyAnswer,
  onPrepareNextQuestion,
  onTimeExpired,
}) {
  const [remainingTime, setReimainingTime] = useState(timer);

  useEffect(() => {
    setReimainingTime(timer);
    const interval = setInterval(() => {
      setReimainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          setTimeout(() => {
            if (questionState === QuestionProgress.SUBMITTING) {
              onSubmitAnswer();
            } else if (questionState === QuestionProgress.VERIFYING) {
              onVerifyAnswer();
            } else if (questionState === QuestionProgress.PREPARINGNEXT) {
              onPrepareNextQuestion();
            } else {
              onTimeExpired();
            }
          }, 0);
          return 0;
        }
        return prevTime - 15.5;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [
    timer,
    questionState,
    onSubmitAnswer,
    onVerifyAnswer,
    onPrepareNextQuestion,
    onTimeExpired,
  ]);

  return (
    <progress
      value={remainingTime}
      max={timer}
      className={
        questionState === QuestionProgress.SUBMITTING ? "answered" : ""
      }
    />
  );
}
