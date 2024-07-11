import React from "react";

import styles from "./MemoryPlayground.module.css";
import MemoryGrid from "../MemoryGrid/MemoryGrid";

function MemoryPlayground() {
  return (
    <div className={styles.wrapper}>
      This is the playgorund: <br />
      ---
      <MemoryGrid />
    </div>
  );
}

export default MemoryPlayground;
