import React from "react";

import styles from "./MemoryGameControls.module.css";
import useTimer from "../../hooks/use-timer";
import { formattedClock } from "../../utils";

import { MemoryGameStateContext } from "./../MemoryGameStateProvider";

function MemoryGameControls() {
  const { isPlaying, setIsPlaying, createGame } = React.useContext(
    MemoryGameStateContext
  );

  const timer = useTimer();

  // Start or stop the timer based on isPlaying
  React.useEffect(() => {
    if (isPlaying) {
      timer.start();
    } else {
      timer.stop();
    }
  }, [isPlaying, timer]);

  // format timer to display minutes and seconds
  const formattedTimer = React.useMemo(() => {
    return formattedClock(timer.time);
  }, [timer.time]);

  function handleReset() {
    timer.reset();
    setIsPlaying(false);
    createGame();
  }

  return (
    <div className={styles.gamecontrols}>
      <span className={styles.timer}>{formattedTimer}</span>
      <button className={styles.reset__btn} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default MemoryGameControls;
