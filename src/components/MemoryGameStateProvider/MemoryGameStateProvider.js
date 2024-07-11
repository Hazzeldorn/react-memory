import React from "react";
import { generateNewGame } from "../../game-helpers";

export const MemoryGameStateContext = React.createContext();

const NUM_ROWS = 4;
const NUM_COLS = 5;

function MemoryGameStateProvider({ children }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [foundCards, setFoundCards] = React.useState([]);
  const [flippedCards, setFlippedCards] = React.useState([]);

  // generate and memoize the initial cards
  const createGame = React.useCallback(() => {
    setCards(generateNewGame(NUM_ROWS, NUM_COLS));
    setFoundCards([]);
    setFlippedCards([]);
  }, []);

  return (
    <MemoryGameStateContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        cards,
        foundCards,
        setFoundCards,
        flippedCards,
        setFlippedCards,
        createGame,
        numCols: NUM_COLS,
        numRows: NUM_ROWS,
      }}
    >
      {children}
    </MemoryGameStateContext.Provider>
  );
}

export default MemoryGameStateProvider;
