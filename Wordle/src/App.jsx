import { useState, useEffect } from 'react';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() =>{
    fetch("http://localhost:3000/solutions")
      .then((res) => res.json())
      .then(data => {
        const randomSolution = data[Math.floor(Math.random() * data.length)];
        setSolution(randomSolution.word);
      })
      .catch(error => console.error(error));
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  )
}

export default App
  