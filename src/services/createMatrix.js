const createMatrix = (width, height) => {
  return Array(width)
    .fill([])
    .map(() => Array(height).fill(0));
};

module.exports = createMatrix;
