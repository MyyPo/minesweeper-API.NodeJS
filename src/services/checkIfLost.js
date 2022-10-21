const checkIfLost = (x, y, field) => {
  // returns true if the uncovered cell is a mine
  return field[y][x] === "m";
};

module.exports = checkIfLost;
