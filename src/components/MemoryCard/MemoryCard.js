import React from "react";

import styles from "./MemoryCard.module.css";

function MemoryCard({ isVisible, isFound, onClick, children }) {
  const cardClassName = `${styles.card} ${isFound ? styles.found : ""}`;

  return (
    <div onClick={onClick} className={cardClassName}>
      {isVisible || isFound ? children : <span>?</span>}
    </div>
  );
}

export default MemoryCard;
