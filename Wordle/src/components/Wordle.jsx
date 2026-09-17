import {useEffect} from 'react'
import useWordle from '../useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import keys from './keys';

export default function Wordle({ solution}){
    const {currentGuess, handleKeyup, turn, guesses, isCorrect, usedKeys} = useWordle(solution);

    useEffect(() => {
        window.addEventListener("keyup",handleKeyup)
        return () => window.removeEventListener("keyup",handleKeyup)
    }, [handleKeyup])

    return (
        <div>
            <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
            <Keypad keys = {keys} usedKeys={usedKeys}/>
        </div>
    )
}