import React from "react";
import MemoryCard from "../MemoryCard/MemoryCard";

import styles from "./MemoryGrid.module.css";

import { MEMORY_CARD_ICONS } from "../../data";
import { sampleMulti, arrayShuffle } from "../../utils";

const NUM_ROWS = 2;
const NUM_COLS = 3;

// Validation
const validateGrid = (rows, cols) => {
  if (rows < 2 || cols < 2) throw new Error("Grid is too small");
  if (rows * cols > MEMORY_CARD_ICONS.length * 2)
    throw new Error("Grid is too big");
  if ((rows * cols) % 2 !== 0) throw new Error("Number of cards must be even");
};

validateGrid(NUM_ROWS, NUM_COLS);

function MemoryGrid({ isPlaying, setIsPlaying }) {
  const [cards, setCards] = React.useState([]);
  const [flippedCards, setFlippedCards] = React.useState([]);
  const [foundCards, setFoundCards] = React.useState([]);

  const dynamicGridStyle = {
    gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)`,
    gridTemplateRows: `repeat(${NUM_ROWS}, 1fr)`,
  };

  // generate and memoize the initial cards
  const initialCards = React.useMemo(() => {
    let iconList = [];
    sampleMulti(MEMORY_CARD_ICONS, (NUM_ROWS * NUM_COLS) / 2).forEach(
      (icon, index) => {
        iconList.push({ groupId: index, icon });
        iconList.push({ groupId: index, icon });
      }
    );
    return arrayShuffle(iconList);
  }, []);

  React.useEffect(() => {
    setCards(arrayShuffle(initialCards));
  }, [initialCards]);

  // check matches outside of react render cycle
  const timeoutRef = React.useRef(null);
  React.useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.groupId === secondCard.groupId) {
        timeoutRef.current = setTimeout(() => {
          setFoundCards((prevFoundCards) => [
            ...prevFoundCards,
            firstCard,
            secondCard,
          ]);
          setFlippedCards([]);
        }, 300);
      } else {
        timeoutRef.current = setTimeout(() => {
          setFlippedCards([]);
        }, 800);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [flippedCards]);

  // check if all cards are found
  React.useEffect(() => {
    if (isPlaying && foundCards.length === NUM_ROWS * NUM_COLS) {
      alert("Congratulations!");
      setIsPlaying(false);
    }
  }, [foundCards, isPlaying, setIsPlaying]);

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
