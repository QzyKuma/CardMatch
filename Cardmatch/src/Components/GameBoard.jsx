import React from 'react';
import Data from './Data';
import Card from './Card';


function GameBoard () {
        const [cardsArray, setCardsArray] = React.useState([]);
        const [moves, setMoves] = React.useState(0);
        const [firstCard, setFirstCard] = React.useState(null);
        const [secondCard, setSecondCard] = React.useState(null);
        const [stopFlip, setStopFlip] = React.useState(false);
        const [won, setWon] = React.useState(0);

        // Function to start game

        function NewGame() {
                setTimeout (() =>{
                    const randomOrderArray = Data.sort(() => 0.5 - Math.random());
                    setCardsArray(randomOrderArray);
                    setMoves(0);
                    setFirstCard(null);
                    setSecondCard(null);
                    setWon(0);
                }, 1200);
        }


    //this function helps in storing the firstCard and secondCard value
        function handleSelectedCards(item) {
            console.log(typeof item);
            if (firstCard !== null && firstCard !== item.id) {
                setSecondCard(item);
            } else {
                setFirstCard(item);
            }
        }


}

export default GameBoard;