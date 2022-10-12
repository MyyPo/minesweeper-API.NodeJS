const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Service = require("../services");

// models
const Game = require("../models/Game");
const User = require("../models/User");

const startCustomGame = async (req, res) => {
  const { width, height, mines } = req.body;

  if (!width || !Number.isSafeInteger(width) || width < 5) {
    throw new CustomError.BasicAPIError(
      `Width ${width} is not a valid setting, try an integer bigger than 4 and smaller than 50`,
      400
    );
  }
  if (!height || !Number.isSafeInteger(height) || height < 5) {
    throw new CustomError.BasicAPIError(
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
    throw new CustomError.BasicAPIError(
      `Mines ${mines} is not a valid setting, try a positive integer smaller than 50`,
      400
    );
  }
  if (await Game.exists({ user: "634301e805c36e40e3ba2843" })) {
    throw new CustomError.BasicAPIError(
      `A user can only have one game at a time, please, delete your active game first`,
      400
    );
  }

  const field = Service.createMatrix(width, height, 0);
  const uncoveredField = Service.createMatrix(width, height, false);
  const flaggedField = Service.createMatrix(width, height, false);

  Service.prepareField(field, mines, width, height);
  await Game.create({
    user: "634301e805c36e40e3ba2843",
    mode: "custom",
    field: field,
    field: field,
    uncoveredField: uncoveredField,
    flaggedField: flaggedField,
    width: width,
    height: height,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Custom game created!", uncoveredField: uncoveredField });
};

const startRankedGame = async (req, res) => {
  if (await Game.exists({ user: "634301e805c36e40e3ba2843" })) {
    throw new CustomError.BasicAPIError(
      `A user can only have one game at a time, please, delete your active game first`,
      400
    );
  }

  const field = Service.createMatrix(16, 16, 0);
  const uncoveredField = Service.createMatrix(16, 16, false);
  const flaggedField = Service.createMatrix(16, 16, false);
  Service.prepareField(field, 42, 16, 16);
  await Game.create({
    user: "634301e805c36e40e3ba2843",
    mode: "ranked",
    field: field,
    uncoveredField: uncoveredField,
    flaggedField: flaggedField,
    width: 16,
    height: 16,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Ranked game created!",
    field: field,
    uncoveredField: uncoveredField,
  });
};

module.exports = { startCustomGame, startRankedGame };
