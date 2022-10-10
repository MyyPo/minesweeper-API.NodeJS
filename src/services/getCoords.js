const getCoords = (x, y, width, height) =>
  [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x + 1],
    [y, x - 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
  ].filter(([y, x]) => y >= 0 && x >= 0 && x < width && y < height);

module.exports = getCoords;
