import {useEffect, useState} from 'react'
import useWordle from '../useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import keys from './keys';
import Modal from './Modal';

export default function Wordle({ solution, onNewGame }){
    const [showModal, setShowModal] = useState(false);
    const {currentGuess, handleKeyup, turn, guesses, isCorrect, usedKeys} = useWordle(solution);

    useEffect(() => {
        window.addEventListener("keyup",handleKeyup)

        if(isCorrect){
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener("keyup", handleKeyup);
        }
        if (turn >5){
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener("keyup", handleKeyup);
        }


        return () => window.removeEventListener("keyup",handleKeyup)
    }, [handleKeyup])

    return (
        <div>
            <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
            <Keypad keys = {keys} usedKeys={usedKeys}/>
            {showModal && <Modal isCorrect = {isCorrect} solution={solution} turn={turn} onNewGame={onNewGame} />}
        </div>
    )
}