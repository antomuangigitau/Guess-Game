import { useEffect, useState } from "react";

const ColorGame = () => {
  const colors: string[] = [
    "#9CAF88",
    "#D8A7B1",
    "#87CEEB",
    "#E6B566",
    "#E6E6FA",
    "#F9A384",
  ];

  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [shouldChangeColor, setShouldChangeColor] = useState(false);

  const startGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setScore(0);
    setGameStatus("");
  };

  const handleGuess = (color: string) => {
    if (color === targetColor) {
      setScore(score + 1);
      setGameStatus("Correct 🎉🎊🎈");
      setShouldChangeColor((score + 1) % 5 === 0);
    } else {
      setGameStatus("Wrong!😈 Try again.");
    }
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (shouldChangeColor) {
      let newColor;
      do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
      } while (newColor === targetColor);
      setTargetColor(newColor);
      setShouldChangeColor(false);
    }
  }, [shouldChangeColor, targetColor]);
  return (
    <div className="container">
      <div className="inner__container">
        <div className="game__info">
          <h3 className="game__instructions" data-testid="gameInstructions">
            Guess the correct color!
          </h3>
          <div
            className="target__box"
            data-testid="colorBox"
            style={{ backgroundColor: targetColor }}></div>
        </div>

        <div className="color__options">
          {colors.map((color, index) => (
            <button
              key={index}
              data-testid="colorOption"
              className="color__option"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}></button>
          ))}
        </div>
        <h3
          className={`show__status ${
            gameStatus === "Correct 🎉🎊🎈" ? "correct" : "wrong"
          }`}>
          {gameStatus}
        </h3>
        <h3 className="show__score">Score: {score}</h3>
        <button
          className="new__game__btn"
          data-testid="newGameButton"
          onClick={startGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default ColorGame;
