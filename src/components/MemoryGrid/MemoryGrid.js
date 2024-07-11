import React from "react";

import styles from "./MemoryGrid.module.css";

import MemoryCard from "../MemoryCard/MemoryCard";

function MemoryGrid() {
  const NUM_ROWS = 4;
  const NUM_COLS = 4;

  const CARD_CONTENTS = [
    "🍉",
    "🍌",
    "🍏",
    "🍒",
    "🌶️",
    "🍓",
    "🥝",
    "🫐",
    "🍑",
    "🥕",
    "🍆",
    "🍇",
    "🍍",
    "🍊",
    "🍋",
    "🥥",
    "🥭",
    "🍎",
    "🍈",
    "🥑",
    "🥦",
    "🍄",
    "🥬",
    "🌽",
    "🫑",
    "🥔",
  ];

  // guard clause - make sure the grid is not too small
  if (NUM_ROWS < 2 || NUM_COLS < 2) {
    throw new Error("Grid is too small");
  }

  // guard clause - make sure the grid is not too big
  if (NUM_ROWS * NUM_COLS > CARD_CONTENTS.length * 2) {
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
  const selectedItems = CARD_CONTENTS.sort(() => Math.random() - 0.5).slice(
    0,
    (NUM_ROWS * NUM_COLS) / 2
  );

  // double the icons and shuffle them again
  const shuffledItems = [...selectedItems, ...selectedItems].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className={styles.grid} style={dynamicGridStyle}>
      {Array.from({ length: NUM_ROWS * NUM_COLS }).map((_, cardIndex) => (
        <MemoryCard key={cardIndex}>
          <span>{shuffledItems[cardIndex]}</span>
        </MemoryCard>
      ))}
    </div>
  );
}

export default MemoryGrid;
