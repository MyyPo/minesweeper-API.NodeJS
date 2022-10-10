const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Service = require("../services");

// models
const Game = require("../models/Game");
const User = require("../models/User");

const startCustomGame = async (req, res) => {
  const width = 5;
  const height = 5;
  const mines = 5;

  let gameField = Service.createMatrix(width, height);
  gameField = Service.prepareField(gameField, mines, width, height);
  await Game.create({
    user: "634301e805c36e40e3ba2843",
    mode: "custom",
    field: gameField,
  });
  console.log(gameField);
  res.status(StatusCodes.OK).json({ gameField });
};

module.exports = { startCustomGame };
