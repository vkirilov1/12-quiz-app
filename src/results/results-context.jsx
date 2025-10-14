import { createContext, useReducer } from "react";

export const ResultsContext = createContext({
  answers: [],
  addAnswer: () => {},
});

function resultsReducer(state, action) {
  if (action.type === "ADD_ANSWER") {
    const updatedAnswers = [...state.answers];

    updatedAnswers.push({
      id: action.payload.id,
      answer: action.payload.answer,
      isCorrect: action.payload.isCorrect,
    });

    return {
      answers: updatedAnswers,
    };
  }
}

export default function ResultsContextProvider({ children }) {
  const [resultsState, resultsDispatch] = useReducer(resultsReducer, {
    answers: [],
  });

  function handleAddAnswer(id, answer, isCorrect) {
    resultsDispatch({
      type: "ADD_ANSWER",
      payload: { id, answer, isCorrect },
    });
  }

  const ctxValue = {
    answers: resultsState.answers,
    addAnswer: handleAddAnswer,
  };

  return (
    <ResultsContext.Provider value={ctxValue}>
      {children}
    </ResultsContext.Provider>
  );
}
