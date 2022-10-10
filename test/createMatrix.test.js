const createMatrix = require("../src/services/createMatrix");

const matrix = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

test("5 x 5 matrix created", () => {
  expect(createMatrix(5, 5)).toEqual(matrix);
});
