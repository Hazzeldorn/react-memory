import React from "react";

import styles from "./MemoryCard.module.css";

function MemoryCard({ card, onClick, isFlipped, isFound }) {
  const handleClick = () => {
    if (!isFlipped && !isFound) {
      onClick(card);
    }
  };

  let cardClassName = `${styles.card}`;

  if (isFlipped) {
    cardClassName += ` ${styles.flipped}`;
  } else if (isFound) {
    cardClassName += ` ${styles.found}`;
  } else {
    cardClassName += ` ${styles.default}`;
  }

  return (
    <button onClick={handleClick} className={cardClassName}>
      <div className={styles.cardInner}>
        {isFlipped || isFound ? <span>{card.icon}</span> : ""}
      </div>
    </button>
  );
}

export default MemoryCard;
