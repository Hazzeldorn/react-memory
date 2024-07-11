import React from "react";
import MemoryCard from "../MemoryCard/MemoryCard";
import styles from "./MemoryGrid.module.css";
import { MemoryGameStateContext } from "./../MemoryGameStateProvider";

function MemoryGrid() {
  const {
    isPlaying,
    setIsPlaying,
    cards,
    foundCards,
    setFoundCards,
    flippedCards,
    setFlippedCards,
    createGame,
    numCols,
    numRows,
  } = React.useContext(MemoryGameStateContext);

  const dynamicGridStyle = {
    gridTemplateColumns: `repeat(${numCols}, 1fr)`,
    gridTemplateRows: `repeat(${numRows}, 1fr)`,
  };

  React.useEffect(() => {
    createGame();
  }, [createGame]);

  // check matches outside of react render cycle
  const timeoutRef = React.useRef(null);
  React.useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.groupId === secondCard.groupId) {
        timeoutRef.current = window.setTimeout(() => {
          setFoundCards((prevFoundCards) => [
            ...prevFoundCards,
            firstCard,
            secondCard,
          ]);
          setFlippedCards([]);
        }, 300);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          setFlippedCards([]);
        }, 800);
      }
    }

    return () => window.clearTimeout(timeoutRef.current);
  }, [flippedCards, setFoundCards, setFlippedCards]);

  // check if all cards are found
  React.useEffect(() => {
    if (isPlaying && foundCards.length === numRows * numCols) {
      setIsPlaying(false);
      alert("Congratulations!");
    }
  }, [foundCards, isPlaying, setIsPlaying, numRows, numCols]);

  function handleCardClick(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      setFlippedCards((prevFlippedCards) => [...prevFlippedCards, card]);
    }

    if (!isPlaying) {
      setIsPlaying(true);
    }
  }

  return (
    <div className={styles.grid} style={dynamicGridStyle}>
      {cards.map((card, index) => (
        <MemoryCard
          key={index}
          card={card}
          onClick={handleCardClick}
          isFlipped={flippedCards.includes(card)}
          isFound={foundCards.includes(card)}
        />
      ))}
    </div>
  );
}

export default MemoryGrid;
