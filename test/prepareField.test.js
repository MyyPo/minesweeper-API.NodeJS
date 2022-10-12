const prepareField = require("../src/services/prepareField");

const matrix = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
];

test("at least 1 mine created", () => {
  expect(prepareField(matrix, 5, 5, 5).flat(1)).toContain("m");
});
