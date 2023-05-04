import { useState, useEffect } from 'react';

const useWordle = (solution) => {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState('');
	const [guesses, setGuesses] = useState([]);
	const [history, setHistory] = useState([]);
	const [isCorrect, setIsCorrect] = useState(false);

    const formatGuess = () => {
        console.log('formatting guess - ', currentGuess);
    };

	const addNewGuess = (guess) => {};

    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            if (currentGuess.length > 5) {
                console.log('too long');
                return;
            }

            if (history.includes(currentGuess)) {
                console.log('already guessed');
                return;
            }

			if (currentGuess.length === 5) {
				setGuesses((prev) => [...prev, currentGuess]);
				setCurrentGuess('');
            }

            if (currentGuess.length !== 5) {
                console.log('Word must be 5 letters long');
                return;
            }
            formatGuess();
		}

        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, prev.length - 1)
            })
        }

        if (/^[A-Za-z]$/.test(key)) {
            if(currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key.toUpperCase()
                })
            }
        }
    };

	const checkGuess = (guess) => {};

	return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
