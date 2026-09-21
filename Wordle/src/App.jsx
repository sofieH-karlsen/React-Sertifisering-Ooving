import { useState, useEffect, useCallback } from 'react';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState(null);
  const [gameId, setGameId] = useState(0);

  const startNewGame = useCallback(() => {
    fetch("http://localhost:3000/solutions")
      .then((res) => res.json())
      .then(data => {
        const randomSolution = data[Math.floor(Math.random() * data.length)];
        setSolution(randomSolution.word)
        setGameId(id => id + 1);
      })
      .catch(error => console.error(error));
  }, []);


  useEffect(() =>{
    startNewGame();
  }, [startNewGame]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle key={gameId} solution={solution} onNewGame={startNewGame} />}
    </div>
  )
}

export default App
  