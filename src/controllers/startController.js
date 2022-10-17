const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Service = require("../services");

// models
const Game = require("../models/Game");
const User = require("../models/User");

const startCustomGame = async (req, res) => {
  const { width, height, mines } = req.body;

  if (!width || !Number.isSafeInteger(width) || width < 5) {
    throw new CustomError.BadRequestError(
      `Width ${width} is not a valid setting, try an integer bigger than 4 and smaller than 50`,
      400
    );
  }
  if (!height || !Number.isSafeInteger(height) || height < 5) {
    throw new CustomError.BadRequestError(
      `Height ${height} is not a valid setting, try an integer bigger than 4 and smaller than 50`,
      400
    );
  }
  if (
    !mines ||
    !Number.isSafeInteger(mines) ||
    mines < 0 ||
    mines > Math.floor((width * height) / 2)
  ) {
    throw new CustomError.BadRequestError(
      `Mines ${mines} is not a valid setting, try a positive integer smaller than 50`,
      400
    );
  }
  if (await Game.exists({ user: req.user.userId })) {
    throw new CustomError.BadRequestError(
      `A user can only have one game at a time, please, delete your active game first`,
      400
    );
  }

  const field = Service.createMatrix(width, height, 0);
  const uncoveredField = Service.createMatrix(width, height, false);

  Service.prepareField(field, mines, width, height);
  await Game.create({
    user: req.user.userId,
    mode: "custom",
    field: field,
    uncoveredField: uncoveredField,
    width: width,
    height: height,
  });
  res
    .status(StatusCodes.CREATED)
    .json({
      msg: "Custom game created!",
      uncoveredField: uncoveredField,
      width: width,
    });
};

const startRankedGame = async (req, res) => {
  if (await Game.exists({ user: req.user.userId })) {
    throw new CustomError.BadRequestError(
      `A user can only have one game at a time, please, delete your active game first`,
      400
    );
  }

  const field = Service.createMatrix(16, 16, 0);
  const uncoveredField = Service.createMatrix(16, 16, false);
  Service.prepareField(field, 42, 16, 16);
  await Game.create({
    user: req.user.userId,
    mode: "ranked",
    field: field,
    uncoveredField: uncoveredField,
    width: 16,
    height: 16,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Ranked game created!",
    uncoveredField: uncoveredField,
    width: 16,
  });
};

module.exports = { startCustomGame, startRankedGame };
