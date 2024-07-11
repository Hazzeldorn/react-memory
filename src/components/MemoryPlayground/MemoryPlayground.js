import React from "react";

import styles from "./MemoryPlayground.module.css";
import MemoryGrid from "../MemoryGrid/MemoryGrid";
import MemoryGameControls from "../MemoryGameControls/MemoryGameControls";

function MemoryPlayground() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  function resetGame() {
    setIsPlaying(false);
  }

  return (
    <div className={styles.wrapper}>
      <MemoryGameControls isPlaying={isPlaying} resetGame={resetGame} />
      <MemoryGrid isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </div>
  );
}

export default MemoryPlayground;
