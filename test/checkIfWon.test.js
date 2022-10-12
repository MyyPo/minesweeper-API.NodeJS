const checkIfWon = require("../src/services/checkIfWon");

const field = [
  [1, 2, 2, 2, 1],
  ["m", 3, "m", "m", 1],
  [1, 3, "m", 4, 2],
  [0, 1, 2, "m", 1],
  [0, 0, 1, 1, 1],
];

const victoryUncoveredField = [
  [true, true, true, true, true],
  [false, true, false, false, true],
  [true, true, false, true, true],
  [true, true, true, false, true],
  [true, true, true, true, true],
];

const noVictoryUncoveredField = [
  [false, true, true, true, true],
  [false, true, false, false, true],
  [false, true, false, true, true],
  [true, true, true, false, false],
  [false, true, true, true, true],
];

test("All non-mine fields opened", () => {
  expect(checkIfWon(field, victoryUncoveredField)).toEqual(true);
});
test("Not all non-mine fields are opened yet", () => {
  expect(checkIfWon(field, noVictoryUncoveredField)).toEqual(false);
});
