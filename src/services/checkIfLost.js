const checkIfLost = (x, y, field) => {
  return field[y][x] === "m";
};

module.exports = checkIfLost;
