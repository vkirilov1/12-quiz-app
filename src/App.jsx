import { useState } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Summary from "./components/Summary";
import ResultsContextProvider from "./results/results-context";

function App() {
  const [isFinished, setIsFinished] = useState(false);

  function handleFinishQuiz() {
    setIsFinished(() => !isFinished);
  }

  return (
    <ResultsContextProvider>
      <div>
        <Header></Header>
        {isFinished ? <Summary /> : <Quiz onFinishQuiz={handleFinishQuiz} />}
      </div>
    </ResultsContextProvider>
  );
}

export default App;
