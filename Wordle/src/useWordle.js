import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({});
 
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
        return {key: l, color: 'grey'}
    });

    formattedGuess.forEach((l,i)=>{
        if(solution[i]===l.key){
            formattedGuess[i].color = 'green';
            solutionArray[i] = null;
        }
    });

    formattedGuess.forEach((l,i)=>{
        if(solutionArray.includes(l.key) && l.color !== 'green'){
            formattedGuess[i].color = 'yellow';
            solutionArray[solutionArray.indexOf(l.key)] = null;
        }
    });
    
    return formattedGuess
  }

  
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution){
        setIsCorrect(true);
    }
    setGuesses((prevGuesses)=> {
        let newGuesses = [...prevGuesses];
        newGuesses[turn] = formattedGuess;
        return newGuesses;
    })
    setHistory((prevHistory) => [...prevHistory, currentGuess]);
    setTurn((prevTurn) => prevTurn + 1);

    setUsedKeys(prevUsedKeys => {
        const newUsedKeys = { ...prevUsedKeys };
        formattedGuess.forEach(l=> {
            const currentColor = newUsedKeys[l.key];

            if(l.color === 'green'){
                newUsedKeys[l.key] = 'green';
                return;
            }
            if(l.color === 'yellow' && currentColor !== 'green'){
                newUsedKeys[l.key] = 'yellow';
                return;
            }
            if(l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow'){
                newUsedKeys[l.key] = 'grey';
                return;
            }
        })
        return newUsedKeys;
    })
    setCurrentGuess('');
  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if(key === "Enter"){
        if (turn > 5){
            console.log("No more turns left");
            return;
        }
        if(history.includes(currentGuess)){
            console.log("You have already tried that word");
            return;
        }
        if(currentGuess.length !== 5){
            console.log("Word must be 5 letters");
            return;
        }
        const formatted = formatGuess();
        addNewGuess(formatted);
    }

    if(key=== "Backspace"){
        setCurrentGuess(prev => prev.slice(0, -1));
        return;
    }
    if(/^[a-zæøåA-ZÆØÅ]$/.test(key)){
        if (currentGuess.length < 5) {
            setCurrentGuess(prev => prev + key);
        }
    }
  }

  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}
}

export default useWordle