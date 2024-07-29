import React from "react";
import Data from "./Data";
import Card from "./Card";

function GameBoard() {
    const [cardsArray, setCardsArray] = React.useState([]);
    const [moves, setMoves] = React.useState(0);
    const [firstCard, setFirstCard] = React.useState(null);
    const [secondCard, setSecondCard] = React.useState(null);
    const [stopFlip, setStopFlip] = React.useState(false);
    const [won, setWon] = React.useState(0);

    // Start a new game
    function NewGame() {
        setTimeout(() => {
            const randomOrderArray = Data.sort(() => 0.5 - Math.random());
            setCardsArray(randomOrderArray);
            setMoves(0);
            setFirstCard(null);
            setSecondCard(null);
            setWon(0);
        }, 1200);
    }

    // Handle selected cards
    function handleSelectedCards(item) {
        if (firstCard !== null && firstCard.id !== item.id) {
            setSecondCard(item);
        } else {
            setFirstCard(item);
        }
    }

    React.useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray((prevArray) => {
                    return prevArray.map((unit) => {
                        if (unit.name === firstCard.name) {
                            return { ...unit, matched: true };
                        } else {
                            return unit;
                        }
                    });
                });
                setWon((preVal) => preVal + 1);
                removeSelection();
            } else {
                setTimeout(() => {
                    removeSelection();
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    // Remove selection
    function removeSelection() {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prevValue) => prevValue + 1);
    }

    // Start the game for the first time
    React.useEffect(() => {
        NewGame();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="header text-center mb-6">
                <h1 className="text-5xl font-extrabold text-blue-500 tracking-wide">Memory Game</h1>
            </div>
            <div
                className="board grid grid-cols-4 gap-4 mb-6 backdrop-blur-md bg-white/30 border border-white/10 shadow-lg p-6 rounded-lg">
                {cardsArray.map((item) => (
                    <Card
                        item={item}
                        key={item.id}
                        handleSelectedCards={handleSelectedCards}
                        toggled={
                            item === firstCard ||
                            item === secondCard ||
                            item.matched === true
                        }
                        stopflip={stopFlip}
                    />
                ))}
            </div>

            {won !== 6 ? (
                <div className="text-center text-lg text-gray-400 mb-4">Moves: {moves}</div>
            ) : (
                <div className="text-center text-2xl font-bold text-green-400 mb-4">
                    🎉 You Won in {moves} moves! 🎉
                </div>
            )}
            <div className="text-center">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" onClick={NewGame}>
                    New Game
                </button>
            </div>
        </div>
    );
}

export default GameBoard;
