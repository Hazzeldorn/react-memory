import React from "react";

const useTimer = () => {
  const [time, setTime] = React.useState(0);
  const timerRef = React.useRef(null);

  const start = React.useCallback(() => {
    if (timerRef.current !== null) return; // Prevent multiple intervals

    timerRef.current = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }, []);

  const stop = React.useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = React.useCallback(() => {
    stop();
    setTime(0);
  }, [stop]);

  React.useEffect(() => {
    return () => stop(); // Cleanup on unmount
  }, [stop]);

  return { time, start, stop, reset };
};

export default useTimer;
