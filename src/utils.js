/**
 * Returns a random element from the given array.
 * @param {Array} arr - The array to sample from.
 * @returns {*} - The randomly selected element.
 */
export const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Returns a given number of unique random elements from the given array.
 * @param {Array} arr - The array to sample from.
 * @param {number} n - The number of elements to sample.
 * @returns {Array} - The randomly selected elements.
 */
export const sampleMulti = (arr, n) => {
  const shuffled = arr.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
};

/**
 * Shuffles the elements of the given array.
 * @param {*} arr - The array to shuffle.
 * @returns arr - shuffled array
 */
export const arrayShuffle = (arr) => {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generates an array of numbers based on the given start, end, and optional step parameters
 * @param {*} start
 * @param {*} end
 * @param {*} step (optional)
 * @returns
 */
export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

/**
 * Formats the given time in seconds to a string with minutes and seconds.
 * @param {number} elapsedTime - The time in seconds.
 * @returns {string} - The formatted time string.
 */
export const formattedClock = (elapsedTime) => {
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
