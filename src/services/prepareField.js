const getCoords = require("./getCoords");

const prepareField = (field, mines, width, height) => {
  while (mines > 0) {
    const mineX = Math.round(Math.random() * (width - 1));
    const mineY = Math.round(Math.random() * (height - 1));

    if (field[mineY][mineX] !== "m") {
      field[mineY][mineX] = "m";
      getCoords(mineX, mineY, width, height)
        .filter(([y, x]) => field[y][x] !== "m")
        .forEach(([y, x]) => {
          field[y][x]++;
        });

      mines--;
    }
  }
  return field;
};

module.exports = prepareField;
