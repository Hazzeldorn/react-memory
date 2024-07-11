import { arrayShuffle, sampleMulti } from "./utils";
import { MEMORY_CARD_ICONS } from "./data";

/**
 * Check if the given grid configuration is valid
 * @param {number} numRows
 * @param {number} numCols
 */

const validateGrid = (numRows, numCols) => {
  if (numRows < 2 || numCols < 2) throw new Error("Grid is too small");
  if (numRows * numCols > MEMORY_CARD_ICONS.length * 2)
    throw new Error("Grid is too big");
  if ((numRows * numCols) % 2 !== 0)
    throw new Error("Number of cards must be even");
};

/**
 * Generates a random set of memory cards
 * @param {*} numRows
 * @param {*} numCols
 * @param {*} data
 * @returns
 */
export const generateNewGame = (numRows, numCols) => {
  // validate configuration
  validateGrid(numRows, numCols);

  // generate a list of icons
  let iconList = [];
  sampleMulti(MEMORY_CARD_ICONS, (numRows * numCols) / 2).forEach(
    (icon, index) => {
      iconList.push({ groupId: index, icon });
      iconList.push({ groupId: index, icon });
    }
  );
  return arrayShuffle(iconList);
};
