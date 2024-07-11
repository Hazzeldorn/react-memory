import React from "react";
import MemoryCard from "../MemoryCard/MemoryCard";

import styles from "./MemoryGrid.module.css";

import { MEMORY_CARD_ICONS } from "../../data";

function MemoryGrid() {
  const NUM_ROWS = 3;
  const NUM_COLS = 4;

  // guard clause - make sure the grid is not too small
  if (NUM_ROWS < 2 || NUM_COLS < 2) {
    throw new Error("Grid is too small");
  }

  // guard clause - make sure the grid is not too big
  if (NUM_ROWS * NUM_COLS > MEMORY_CARD_ICONS.length * 2) {
    throw new Error("Grid is too big");
  }

  // make sure the number of cards is even
  if ((NUM_ROWS * NUM_COLS) % 2 !== 0) {
    throw new Error("Number of cards must be even");
  }

  const dynamicGridStyle = {
    gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)`,
    gridTemplateRows: `repeat(${NUM_ROWS}, 1fr)`,
  };

  // randomly pick icons for the cards
  const selectedItems = MEMORY_CARD_ICONS.sort(() => Math.random() - 0.5).slice(
    0,
    (NUM_ROWS * NUM_COLS) / 2
  );

  // double the icons and shuffle them again
  const shuffledItems = [...selectedItems, ...selectedItems].sort(
    () => Math.random() - 0.5
  );

  const [cardIcons, setCardIcons] = React.useState(shuffledItems);
  const [flippedCards, setFlippedCards] = React.useState([]);
  const [foundCards, setFoundCards] = React.useState([]);

  function handleClick(index) {
    // if the card is already flipped or found, return
    if (flippedCards.includes(index) || foundCards.includes(index)) {
      return;
    }

    // ...otherwise flip the card
    const nextFlippedCards = [...flippedCards, index];
    setFlippedCards(nextFlippedCards);

    // if two cards are flipped, check if they match
    if (nextFlippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = nextFlippedCards;
      if (cardIcons[firstCardIndex] === cardIcons[secondCardIndex]) {
        console.log("Match!");
        setFoundCards([...foundCards, firstCardIndex, secondCardIndex]);
      } else {
        console.log("No match!");
      }

      // reset the flipped cards after a short delay
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }

  return (
    <div className={styles.grid} style={dynamicGridStyle}>
      {Array.from({ length: NUM_ROWS * NUM_COLS }).map((_, cardIndex) => (
        <MemoryCard
          key={cardIndex}
          onClick={() => handleClick(cardIndex)}
          isVisible={flippedCards.includes(cardIndex)}
          isFound={foundCards.includes(cardIndex)}
        >
          <span>{cardIcons[cardIndex]}</span>
        </MemoryCard>
      ))}
    </div>
  );
}

export default MemoryGrid;
