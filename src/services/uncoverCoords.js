const getCoords = require("./getCoords");

const uncoverCoords = (x, y, field, uncoveredField, width, height) => {
  // Uncover the cell by default
  uncoveredField[y][x] = field[y][x];

  // returns an array of arrays (neighbouring cells)
  const neighbours = getCoords(x, y, width, height);

  if (field[y][x] === 0) {
    // if uncovered field is 0 try to uncover the neighbours too
    // passing neighbour coordinates next
    neighbours.forEach(([y, x]) => {
      // this check prevents the infinite recursion
      // by looking at the field with neighbour coordinates
      if (uncoveredField[y][x] === false) {
        // recursion call uncovering 0 neighbours
        uncoverCoords(x, y, field, uncoveredField, width, height);
      }
    });
  }
  return uncoveredField;
};
module.exports = uncoverCoords;
