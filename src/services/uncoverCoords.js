const getCoords = require("./getCoords");

const uncoverCoords = (x, y, field, width, height) => {
  // Uncover the field by default
  uncoveredField[y][x] = true;

  const neighbours = getCoords(x, y, width, height);

  // Only if the field is a 0, so if it has no adjacent mines,
  // ask its neighbours to uncover.
  if (field[y][x] === 0) {
    neighbours.forEach(([y, x]) => {
      // Only uncover fields that have not yet been uncovered.
      // Otherwise we would end up with an infinite loop.
      if (uncoveredField[y][x] !== true) {
        // Recursive call.
        uncoverCoords(x, y);
      }
    });
  }
  return field;
};

module.exports = uncoverCoords;
