import { useState, useEffect } from 'react';

const useWordle = (solution) => {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState('');
	const [guesses, setGuesses] = useState([...Array(6)]);
	const [history, setHistory] = useState([]);
	const [isCorrect, setIsCorrect] = useState(false);

	// format guess into an array of letter objects
	const formatGuess = () => {
		let solutionArray = [...solution];
		let formattedGuess = [...currentGuess].map((letter) => {
			return { key: letter, color: 'grey' };
		});

		formattedGuess.forEach((letter, index) => {
			if (letter.key === solutionArray[index]) {
				formattedGuess[index].color = 'green';
				solutionArray[index] = null;
			}
        });

        formattedGuess.forEach((letter, index) => {
            if (solutionArray.includes(letter.key) && letter.color !== 'green') {
                formattedGuess[index].color = 'yellow';
                solutionArray[solutionArray.indexOf(letter.key)] = null;
            }
        });

        return formattedGuess;
	};

    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution) {
            setIsCorrect(true);
        }
        setGuesses(prevGuesses => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });
        setHistory(prevHistory => [...prevHistory, currentGuess]);
        setTurn(prevTurn => prevTurn + 1);
        setCurrentGuess('');
    };

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
				setHistory((prev) => [...prev, currentGuess]);
				setCurrentGuess('');
			}

			if (currentGuess.length !== 5) {
				console.log('Word must be 5 letters long');
				return;
			}
            const formattedGuess = formatGuess();
            addNewGuess(formattedGuess);
		}

		if (key === 'Backspace') {
			setCurrentGuess((prev) => {
				return prev.slice(0, prev.length - 1);
			});
		}

		if (/^[A-Za-z]$/.test(key)) {
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => {
					return prev + key;
				});
			}
		}
	};

	const checkGuess = (guess) => {};

	return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
