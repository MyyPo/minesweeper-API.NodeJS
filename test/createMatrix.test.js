const createMatrix = require("../src/services/createMatrix");

const matrix = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
];

const params = {
  width: 5,
  height: 5,
  filling: false,
};

test("5 x 5 matrix created", () => {
  expect(createMatrix(params.width, params.height, params.filling)).toEqual(
    matrix
  );
});
