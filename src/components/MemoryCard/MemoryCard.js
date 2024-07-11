import React from "react";

import styles from "./MemoryCard.module.css";

function MemoryCard({ children }) {
  return <div className={styles.card}>{children}</div>;
}

export default MemoryCard;
