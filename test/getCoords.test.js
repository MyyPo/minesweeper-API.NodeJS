const getCoords = require("../src/services/getCoords");

const expectedNeighbours = [
  [2, 0],
  [2, 1],
  [3, 1],
  [4, 0],
  [4, 1],
];

test("x=1, y=4 spot neighbours", () => {
  expect(getCoords(0, 3, 5, 5)).toEqual(expectedNeighbours);
});
