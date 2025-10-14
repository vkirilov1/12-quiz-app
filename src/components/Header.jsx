import quiz_logo from "../assets/quiz-logo.png";

export default function Header() {
  const TITLE = "REACTQUIZ";

  return (
    <header>
      <img src={quiz_logo} alt="quiz logo"></img>
      <h1>{TITLE}</h1>
    </header>
  );
}
