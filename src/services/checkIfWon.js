// placeholder
const checkIfWon = (field, uncoveredField) => {
  return uncoveredField.every((row, y) =>
    row.every((cell, x) => {
      return (cell && field[y][x] !== "m") || (!cell && field[y][x] === "m");
    })
  );
};

module.exports = checkIfWon;
