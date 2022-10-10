const prepareField = require("../src/services/prepareField");

const matrix = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

test("at least 1 mine created", () => {
  expect(prepareField(matrix, 5, 5, 5).flat(1)).toContain("m");
});
