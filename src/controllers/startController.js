const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Service = require("../services");

// models
const Game = require("../models/Game");
const User = require("../models/User");

// utils
const deepCopy = require("../utils/deepCopy");

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

  const gameField = Service.createMatrix(width, height);
  const startingField = deepCopy(gameField);

  Service.prepareField(startingField, mines, width, height);
  await Game.create({
    user: "634301e805c36e40e3ba2843",
    mode: "custom",
    field: gameField,
    startingField: startingField,
    width: width,
    height: height,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Custom game created!" });
};

const startRankedGame = async (req, res) => {
  if (await Game.exists({ user: "634301e805c36e40e3ba2843" })) {
    throw new CustomError.BasicAPIError(
      `A user can only have one game at a time, please, delete your active game first`,
      400
    );
  }

  const gameField = Service.createMatrix(16, 16);
  const startingField = deepCopy(gameField);
  Service.prepareField(gameField, 42, 16, 16);
  await Game.create({
    user: "634301e805c36e40e3ba2843",
    mode: "ranked",
    field: gameField,
    startingField: startingField,
    width: 16,
    height: 16,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Ranked game created!",
    field: startingField,
  });
};

module.exports = { startCustomGame, startRankedGame };
