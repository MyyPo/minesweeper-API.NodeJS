const createMatrix = (width, height, filling) => {
  return Array(width)
    .fill([])
    .map(() => Array(height).fill(filling));
};

module.exports = createMatrix;
