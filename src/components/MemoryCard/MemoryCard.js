import React from "react";

import styles from "./MemoryCard.module.css";

function MemoryCard({ card, onClick, isFlipped, isFound }) {
  const handleClick = () => {
    if (!isFlipped && !isFound) {
      onClick(card);
    }
  };

  // define styles based on card state
  let cardClassName = styles.card;

  if (isFlipped) {
    cardClassName += ` ${styles["card--flipped"]}`;
  } else if (isFound) {
    cardClassName += ` ${styles["card--found"]}`;
  } else {
    cardClassName += ` ${styles["card--default"]}`;
  }

  return (
    <button onClick={handleClick} className={cardClassName}>
      <div className={styles.card__inner}>
        <div className={styles.card__front}></div>
        <div className={styles.card__back}>
          {isFlipped || isFound ? <span>{card.icon}</span> : ""}
        </div>
      </div>
    </button>
  );
}

export default MemoryCard;
