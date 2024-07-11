import React from "react";

import styles from "./MemoryCard.module.css";

function MemoryCard({ isVisible, isFound, onClick, children }) {
  const CARD_STATES = {
    DEFAULT: "default",
    FLIPPED: "flipped",
    FOUND: "found",
  };

  // set card class name by state
  let cardClassName = `${styles.card}`;

  if (isVisible) {
    cardClassName += ` ${styles.flipped}`;
  } else if (isFound) {
    cardClassName += ` ${styles.found}`;
  } else {
    cardClassName += ` ${styles.default}`;
  }

  return (
    <button onClick={onClick} className={cardClassName}>
      <div className={styles.cardInner}>
        {isVisible || isFound ? children : ""}
      </div>
    </button>
  );
}

export default MemoryCard;
