import React from "react";

import { range } from "../../utils";
import styles from "./MemoryCard.module.css";

const MemoryCard = React.forwardRef(
  ({ card, onClick, isFlipped, isFound }, ref) => {
    const handleClick = (event) => {
      if (!isFlipped && !isFound) {
        onClick(card);
      }
    };

    const handleMouseDown = (event) => {
      // prevent focus of element on click
      event.preventDefault();
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
      <button
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        className={cardClassName}
        ref={ref}
      >
        <div className={styles.card__inner}>
          <div className={styles.card__front}>
            <div className={styles.pattern}>
              {range(0, 14).map((i) => (
                <p key={i}>
                  MEMORY&nbsp;&nbsp;MEMORY&nbsp;&nbsp;MEMORY&nbsp;&nbsp;MEMORY
                </p>
              ))}
            </div>
          </div>
          <div className={styles.card__back}>
            {isFlipped || isFound ? <span>{card.icon}</span> : ""}
          </div>
        </div>
      </button>
    );
  }
);

export default MemoryCard;
