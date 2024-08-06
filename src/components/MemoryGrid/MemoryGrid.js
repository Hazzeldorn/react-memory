import React from "react";
import MemoryCard from "../MemoryCard/MemoryCard";
import styles from "./MemoryGrid.module.css";
import { MemoryGameStateContext } from "./../MemoryGameStateProvider";

// TODO: needs refactoring

function MemoryGrid() {
  const {
    isPlaying,
    setIsPlaying,
    cards,
    foundCards,
    setMoveCount,
    setFoundCards,
    flippedCards,
    setFlippedCards,
    createGame,
    numCols,
    numRows,
  } = React.useContext(MemoryGameStateContext);
  const cardRefs = React.useRef([]);

  React.useEffect(() => {
    // Initialize the cardRefs array with the correct number of references
    cardRefs.current = cardRefs.current.slice(0, cards.length);
  }, [cards]);

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
      setTimeout(() => {
        // wait for the last card to show its pop animation
        alert("Congratulations!");
      }, 500);
    }
  }, [foundCards, isPlaying, setIsPlaying, numRows, numCols]);

  function handleCardClick(card) {
    // only allow two flipped cards at a time
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      setFlippedCards((prevFlippedCards) => [...prevFlippedCards, card]);
    }

    // start the game if it's not already started
    if (!isPlaying) {
      setIsPlaying(true);
    }

    // increment move count
    setMoveCount((count) => count + 1);
  }

  function handleKeyDown(event) {
    const focusedElement = document.activeElement;
    const cardIndex = cardRefs.current.indexOf(focusedElement);

    // if not an arrow key, return early
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowUp" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowDown"
    ) {
      return;
    }

    event.preventDefault();

    if (focusedElement === document.body) {
      // No card is focused, focus on the first card
      cardRefs.current[0].focus();
    } else if (event.key === "ArrowRight") {
      const nextIndex = (cardIndex + 1) % cards.length;
      cardRefs.current[nextIndex].focus();
    } else if (event.key === "ArrowUp") {
      const aboveIndex =
        cardIndex - numCols >= 0 ? cardIndex - numCols : cardIndex;
      cardRefs.current[aboveIndex].focus();
    } else if (event.key === "ArrowLeft") {
      const nextIndex = (cardIndex - 1 + cards.length) % cards.length;
      cardRefs.current[nextIndex].focus();
    } else if (event.key === "ArrowDown") {
      const belowIndex =
        cardIndex + numCols < cards.length ? cardIndex + numCols : cardIndex;
      cardRefs.current[belowIndex].focus();
    }
  }

  return (
    <div
      className={styles.grid}
      style={dynamicGridStyle}
      onKeyDown={handleKeyDown}
    >
      {cards.map((card, index) => (
        <MemoryCard
          key={index}
          card={card}
          onClick={handleCardClick}
          isFlipped={flippedCards.includes(card)}
          isFound={foundCards.includes(card)}
          ref={(el) => (cardRefs.current[index] = el)}
        />
      ))}
    </div>
  );
}

export default MemoryGrid;
