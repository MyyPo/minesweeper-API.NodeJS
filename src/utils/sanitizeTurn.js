const CustomError = require("../errors");

const sanitizeTurn = (x, y, game) => {
  if (!Number.isSafeInteger(x) || !Number.isSafeInteger(y)) {
    throw new CustomError.BadRequestError(
      `Your provided coordinates aren't save integers :(`,
      400
    );
  }
  // increase all values by one, since array
  if (x + 1 > game.width || x + 1 <= 0 || y + 1 > game.height || y + 1 <= 0) {
    throw new CustomError.BadRequestError(
      `Your coordinates ${x + 1} or ${y + 1} are outside of the field`,
      400
    );
  }
  if (game.uncoveredField[y][x] !== false) {
    throw new CustomError.BadRequestError(
      `Cell x: ${x + 1}, y: ${y + 1} is already uncovered`,
      400
    );
  } else {
    return [x, y];
  }

  // if (x <= game.width && x >= 0 && y <= game.height && y >= 0) {
  //   return [x, y];
  // } else {
  //   throw new CustomError.BadRequestError(
  //     `Your coordinates ${x + 1} or ${y + 1} are outside of the field`,
  //     400
  //   );
  // }
};

module.exports = sanitizeTurn;
