import React from "react";

import styles from "./MemoryPlayground.module.css";
import MemoryGrid from "../MemoryGrid/MemoryGrid";
import MemoryGameControls from "../MemoryGameControls/MemoryGameControls";
import MemoryGameStateProvider from "../MemoryGameStateProvider/MemoryGameStateProvider";

function MemoryPlayground() {
  return (
    <MemoryGameStateProvider>
      <div className={styles.wrapper}>
        <MemoryGameControls />
        <MemoryGrid />
      </div>
    </MemoryGameStateProvider>
  );
}

export default MemoryPlayground;
