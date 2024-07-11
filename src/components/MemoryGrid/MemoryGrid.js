import React from "react";
import MemoryCard from "../MemoryCard/MemoryCard";

import styles from "./MemoryGrid.module.css";

import { MEMORY_CARD_ICONS } from "../../data";
import { sampleMulti, arrayShuffle } from "../../utils";

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

  const [cards, setCards] = React.useState([]);
  const [flippedCards, setFlippedCards] = React.useState([]);
  const [foundCards, setFoundCards] = React.useState([]);

  // initialize the cards
  React.useEffect(() => {
    let iconList = [];

    // add randomly picked icons to the list
    sampleMulti(MEMORY_CARD_ICONS, (NUM_ROWS * NUM_COLS) / 2).forEach(
      (icon, index) => {
        // puth the same icon twice in the list
        iconList.push({
          groupId: index,
          icon,
        });
        iconList.push({
          groupId: index,
          icon,
        });
      }
    );

    setCards(arrayShuffle(iconList));
  }, []);

  // check matches outside of react render cycle
  React.useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.groupId === secondCard.groupId) {
        setTimeout(() => {
          setFoundCards([...foundCards, firstCard, secondCard]);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, foundCards]);

  function handleCardClick(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      setFlippedCards([...flippedCards, card]);
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
