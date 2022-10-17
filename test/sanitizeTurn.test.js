const sanitizeTurn = require("../src/utils/sanitizeTurn");
const createMatrix = require("../src/services/createMatrix");

const correctValues = {
  game: {
    width: 16,
    height: 16,
    uncoveredField: createMatrix(16, 16, false),
  },
  x: 4,
  y: 1,
};

test("Viable values provided, reduce them by 1 to match array indexes further", () => {
  expect(
    sanitizeTurn(correctValues.x, correctValues.y, correctValues.game)
  ).toEqual([4, 1]);
});

const outOfRangeValues = {
  game: {
    width: 12,
    height: 12,
    uncoveredField: createMatrix(12, 12, false),
  },
  x: 18,
  y: 4,
};

test("Coordinates outside of the game field provided, raises error", () => {
  expect(() => {
    sanitizeTurn(outOfRangeValues.x, outOfRangeValues.y, outOfRangeValues.game);
  }).toThrow("outside");
});

const dangerousValues = {
  game: {
    width: 12,
    height: 12,
  },
  x: 7.4,
  y: 4,
};

test("Coordinated are not valid integers, raises error", () => {
  expect(() => {
    sanitizeTurn(dangerousValues.x, dangerousValues.y, dangerousValues.game);
  }).toThrow("aren't save");
});
