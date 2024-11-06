import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import O_icon from '../Assets/circle_icon.png';
import X_icon from '../Assets/cross_icon.png';

export const TicTacToe = () => {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [count, setCount] = useState(0);
    const [winner, setWinner] = useState(null);
    const [isAI, setIsAI] = useState(false);
    const [score, setScore] = useState({ X: 0, O: 0 });

    const checkWinner = (newBoard) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                return newBoard[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (board[index] !== "" || winner) return;

        const newBoard = [...board];
        newBoard[index] = count % 2 === 0 ? "X" : "O";
        setBoard(newBoard);
        setCount(count + 1);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
            updateScore(gameWinner);
        } else if (count === 8) {
            setWinner("Draw");
        }
    };

    const findWinningMove = (newBoard, player) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newBoard[a] === player && newBoard[b] === player && newBoard[c] === "") {
                return c;
            }
            if (newBoard[a] === player && newBoard[c] === player && newBoard[b] === "") {
                return b;
            }
            if (newBoard[b] === player && newBoard[c] === player && newBoard[a] === "") {
                return a;
            }
        }
        return null;
    };

    const aiMove = () => {
        if (winner) return;

        const newBoard = [...board];
        let move = findWinningMove(newBoard, "O");
        if (move !== null) {
            newBoard[move] = "O";
            setBoard(newBoard);
            setCount(count + 1);
            const gameWinner = checkWinner(newBoard);
            if (gameWinner) {
                setWinner(gameWinner);
                updateScore(gameWinner); // Cập nhật điểm khi AI thắng
            } else if (count === 8) {
                setWinner("Draw");
            }
            return;
        }

        move = findWinningMove(newBoard, "X");
        if (move !== null) {
            newBoard[move] = "O";
            setBoard(newBoard);
            setCount(count + 1);
            const gameWinner = checkWinner(newBoard);
            if (gameWinner) {
                setWinner(gameWinner);
                updateScore(gameWinner); // Cập nhật điểm khi AI thắng
            } else if (count === 8) {
                setWinner("Draw");
            }
            return;
        }

        const availableMoves = newBoard.map((val, index) => (val === "" ? index : null)).filter(val => val !== null);
        if (availableMoves.length > 0) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            newBoard[randomMove] = "O";
        }

        setBoard(newBoard);
        setCount(count + 1);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
            updateScore(gameWinner); // Cập nhật điểm khi AI thắng
        } else if (count === 8) {
            setWinner("Draw");
        }
    };

    useEffect(() => {
        if (isAI && count % 2 !== 0 && !winner) {
            aiMove();
        }
    }, [board, count, isAI, winner]);

    const updateScore = (gameWinner) => {
        if (gameWinner === "X") {
            setScore((prevScore) => ({ ...prevScore, X: prevScore.X + 1 }));
        } else if (gameWinner === "O") {
            setScore((prevScore) => ({ ...prevScore, O: prevScore.O + 1 }));
        }
    };

    const resetScore = () => {
        setScore({ X: 0, O: 0 });
        resetGame();
    };

    const resetGame = () => {
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setWinner(null);
    };

    const toggleMode = () => {
        resetGame();
        setIsAI(!isAI);
    };

    return (
        <div className='container'>
            <h1>TIC </h1><h2>TAC </h2><h1>TOE</h1>
            <div className='modeToggle'>
                <button className='modeButton' onClick={toggleMode}>
                    {isAI ? "Chế độ: Người với AI" : "Chế độ: Người với Người"}
                </button>
            </div>
            <div className='scoreboard'>
                <h2>X: {score.X} </h2>
                <h1> O: {score.O}</h1>
            </div>

            <div className='board'>
                {board.map((value, index) => (
                    <div key={index} className='box' onClick={() => handleClick(index)}>
                        {value === "X" && <img src={X_icon} alt="X" />}
                        {value === "O" && <img src={O_icon} alt="O" />}
                    </div>
                ))}
            </div>

            <button className='resetButton' onClick={resetGame}>Chơi lại</button>
            <button className='resetButton' onClick={resetScore}>Đặt lại điểm số</button>

            {winner && (
                <p className='winnerMessage'>
                    {winner === 'Draw' ? "Trận đấu hòa!" : `Người chiến thắng: ${winner}`}
                </p>
            )}
        </div>
    );
};
