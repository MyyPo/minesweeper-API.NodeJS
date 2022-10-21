const getCoords = require("./getCoords");

const prepareField = (field, mines, width, height) => {
  while (mines > 0) {
    //reduce values by 1 since working with arrays
    const mineX = Math.round(Math.random() * (width - 1));
    const mineY = Math.round(Math.random() * (height - 1));

    // if in the proposed by random field there is no mine
    if (field[mineY][mineX] !== "m") {
      // place a mine
      field[mineY][mineX] = "m";
      // get neigbhour coors of the mine (up to 8 cells)
      getCoords(mineX, mineY, width, height)
        // remove those containing mines
        .filter(([y, x]) => field[y][x] !== "m")
        .forEach(([y, x]) => {
          // increase the integer in every cell around a newly placed mine
          field[y][x]++;
        });

      mines--;
    }
  }
  return field;
};

module.exports = prepareField;
