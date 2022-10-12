const getCoords = require("./getCoords");

const uncoverCoords = (x, y, field, uncoveredField, width, height) => {
  // Uncover the field by default

  if (field[y][x] === "m") {
  } else {
    uncoveredField[y][x] = true;

    const neighbours = getCoords(x, y, width, height);

    if (field[y][x] === 0) {
      neighbours.forEach(([y, x]) => {
        if (uncoveredField[y][x] !== true) {
          // Recursive call.
          uncoverCoords(x, y, field, uncoveredField, width, height);
        }
      });
    }
    return uncoveredField;
  }
};

module.exports = uncoverCoords;
