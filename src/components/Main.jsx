import React from "react"
import languagesInfo from "../languagesInfo"
import { generate, count } from 'random-words'
import farewells from "../farewells"

export default function Main() {

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'

    const [guesses, setGuesses] = React.useState([])

    const [deadLangs, setDeadLangs] = React.useState(0)

    const keyboard = alphabet.toUpperCase().split("")
        .map(item => {
            return item
    })

    const [letters, setLetters] = React.useState(generate({minLength: 7, maxLength: 13})
        .toUpperCase()
        .split("")
        .map(item => {
            return {letter: item, hidden: true}
    }))

    function checkGameState() {
        if(letters.every(letter => !letter.hidden))
            return 'win'
        if(languagesInfo.length - 1 === deadLangs)
            return 'lose'
        return 'on'
    }

    const [gameState, setGameState] = React.useState("on")

    function renderLangs()
    {
        const mapped = languagesInfo.map((item, index) => <span 
            key={item.value} 
            style={item.styles}
            className={index < deadLangs ? "dead" : ""}
            >{item.value}</span>)
        return mapped
    }

    function renderWord() {
        return letters
            .map((item, index) => gameState === 'lose' || gameState === 'win'?
             <span className={item.hidden ? `${gameState} red` : `${gameState} hit`} key={index}>{item.letter}</span> : 
             <span className={!item.hidden ? "hit" : ""} key={index}>{item.hidden ? "" : item.letter}</span>)
    }

    function renderKeyboard() {
        return keyboard.map((item, index) => <button 
                key={index}
                value={item}
                style={getStyle(item)}
                onClick={() => checkLetter(item)}
                disabled={gameState === 'on' ? guesses.some(guess => item === guess.letter) : true}
                >{item}</button>)
    }

    function getStyle(letter) {
        
        if(guesses.some(guess => guess.letter === letter && guess.correct))
            return {backgroundColor:"rgb(19, 201, 19)"}
        else if(guesses.some(guess => !guess.correct && guess.letter === letter))
            return {backgroundColor:"rgb(201, 19, 19)"}
        return {backgroundColor:"rgb(226, 157, 9)"}
    }

    function checkLetter(letter) {
        setLetters(prev => prev.map(item => {
            if(item.hidden === true && item.letter === letter)
            { 
                return {
                ...item,
                hidden: false
                }
            } 
            else
            { 
                return {
                ...item 
                }
            }
        }))
        let corr = letters.some(item => item.letter === letter)
        if(!corr) setDeadLangs(prev => prev + 1)
        setGuesses(prev => [...prev, { letter: letter, correct: corr }])
    }

    React.useEffect(() => {
        setGameState(checkGameState());
    }, [letters, deadLangs]);

    function newGame() {
        setGuesses([])
        setDeadLangs(0)
        setLetters(generate({minLength: 7, maxLength: 13}).toUpperCase().split("")
            .map(item => {
                return {letter: item, hidden: true}
        }))
    }

    function renderStatusBar() {
        return gameState === 'win' ? 
        <section className="status-bar win">
            <h3>You won!</h3>
            <p>Well done</p>
        </section> : 
        gameState === 'lose' ? 
        <section className="status-bar lose">
            <h3>You lost!</h3>
            <p>Better luck next time. Start learning Assembly!"</p>
        </section> : 
        guesses.length !== 0 && !guesses[guesses.length - 1].correct ? <section className="status-bar missed">
            {farewells(languagesInfo[deadLangs - 1].value, deadLangs - 1)}
        </section> :
        <section className="status-bar"></section>
    }

    return (
        <main>
            {renderStatusBar()}
            <div className="langs-div">
                <p>
                    {renderLangs()}
                </p>
            </div>
            <section className="word-section">
                {renderWord()}
            </section>
            <section className="keyboard">{renderKeyboard()}</section>
            {gameState !== 'on' && <button 
                className="ng-button"
                onClick={newGame}>New Game</button>}
        </main>
    )
}