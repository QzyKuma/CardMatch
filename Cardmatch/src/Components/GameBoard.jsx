import React, { useState, useEffect, useCallback } from "react";
import Data from "./Data";
import Card from "./Card";

function GameBoard() {
    const [cardsArray, setCardsArray] = useState([]);
    const [moves, setMoves] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [stopFlip, setStopFlip] = useState(false);
    const [won, setWon] = useState(0);

    // Start a new game with a fresh deck and reset state
    const NewGame = useCallback(() => {
        const shuffledCards = [...Data].sort(() => Math.random() - 0.5);
        setCardsArray(shuffledCards);
        setMoves(0);
        setFirstCard(null);
        setSecondCard(null);
        setWon(0);
        setStopFlip(false);
    }, []);

    // Handle the selected card and the logic for the matching
    const handleSelectedCards = useCallback((item) => {
        if (stopFlip) return;

        if (firstCard === null) {
            setFirstCard(item);
        } else if (firstCard.id !== item.id) {
            setSecondCard(item);
        }
    }, [firstCard, stopFlip]);

    // Effect for handling the card comparison when both cards are selected
    useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray((prevArray) =>
                    prevArray.map((unit) =>
                        unit.name === firstCard.name ? { ...unit, matched: true } : unit
                    )
                );
                setWon((prev) => prev + 1);
                resetSelection();
            } else {
                setTimeout(() => {
                    resetSelection();
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    // Function to reset card selections and increment move count
    const resetSelection = () => {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prev) => prev + 1);
    };

    // Start the game when the component mounts
    useEffect(() => {
        NewGame();
    }, [NewGame]);

    return (
        <div className="container mx-auto p-6">
            <div className="header text-center mb-6">
                <h1 className="text-5xl font-extrabold text-blue-600 tracking-wide">Memory Game</h1>
            </div>
            <div
                className="board grid grid-cols-4 gap-4 mb-6 bg-white/40 border border-gray-300 shadow-md p-6 rounded-lg backdrop-blur-md">
                {cardsArray.map((item) => (
                    <Card
                        item={item}
                        key={item.id}
                        handleSelectedCards={handleSelectedCards}
                        toggled={
                            item === firstCard ||
                            item === secondCard ||
                            item.matched
                        }
                        stopFlip={stopFlip}
                    />
                ))}
            </div>

            {won !== 6 ? (
                <div className="text-center text-lg text-gray-500 mb-4">Moves: {moves}</div>
            ) : (
                <div className="text-center text-2xl font-bold text-green-500 mb-4">
                    🎉 Congratulations! You Won in {moves} moves! 🎉
                </div>
            )}
            <div className="text-center">
                <button
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
                    onClick={NewGame}
                >
                    New Game
                </button>
            </div>
        </div>
    );
}

export default GameBoard;
