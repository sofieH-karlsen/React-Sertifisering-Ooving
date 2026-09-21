export default function Modal({isCorrect, solution,turn, onNewGame}){
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>Gratulerer du klarte det!</h1>
                    <p> Ordet var:</p>
                    <p className="solution">{solution}</p>
                    <p>Du brukte <b>{turn}</b> forsøk</p>
                    <button onClick={onNewGame}>New Game</button>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>Beklager, du klarte det ikke.</h1>
                    <p> Ordet var:</p>
                    <p className="solution">{solution}</p>
                    <button onClick={onNewGame}>New Game</button>
                </div>
            )}
        </div>
    )
}