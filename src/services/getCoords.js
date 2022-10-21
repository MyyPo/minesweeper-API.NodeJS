const getCoords = (x, y, width, height) =>
  [
    // get all 8 maximum cells around the cell
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x + 1],
    [y, x - 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
    //filter out those that are outside of the game field (too little or too big)
  ].filter(([y, x]) => y >= 0 && x >= 0 && x < width && y < height);

module.exports = getCoords;
