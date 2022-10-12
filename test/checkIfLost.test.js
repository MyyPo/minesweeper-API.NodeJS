const checkIfLost = require("../src/services/checkIfLost");

const field = [
  [1, 2, 2, 2, 1],
  ["m", 3, "m", "m", 1],
  [1, 3, "m", 4, 2],
  [0, 1, 2, "m", 1],
  [0, 0, 1, 1, 1],
];

const lost = {
  x: 0,
  y: 1,
};

const notLost = {
  x: 3,
  y: 4,
};

test("Game is lost", () => {
  expect(checkIfLost(lost.x, lost.y, field)).toEqual(true);
});

test("Game isn't lost", () => {
  expect(checkIfLost(notLost.x, notLost.y, field)).toEqual(false);
});
