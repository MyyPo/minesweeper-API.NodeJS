const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Service = require("../services");

// utils
const sanitizeTurn = require("../utils/sanitizeTurn");

// models
const Game = require("../models/Game");
const User = require("../models/User");

const playGame = async (req, res) => {
  let { x, y } = req.body;
  const currentGame = await Game.findOne({ user: "634301e805c36e40e3ba2843" });
  if (currentGame) {
    [x, y] = sanitizeTurn(x, y, currentGame);
    if (Service.checkIfLost(x, y, currentGame.field)) {
      currentGame.uncoveredField[y][x] = "m";
      await Game.deleteOne({
        user: "634301e805c36e40e3ba2843",
      });
      res.status(StatusCodes.OK).json({
        msg: "Game over",
        field: currentGame.field,
        uncoveredField: currentGame.uncoveredField,
      });
    } else {
      const newUncoveredField = Service.uncoverCoords(
        x,
        y,
        currentGame.field,
        currentGame.uncoveredField,
        currentGame.width,
        currentGame.height
      );

      await Game.updateOne(
        { user: "634301e805c36e40e3ba2843" },
        { uncoveredField: newUncoveredField }
      );
      res.status(StatusCodes.OK).json({
        msg: "Turn made",
        field: currentGame.field,
        uncoveredField: currentGame.uncoveredField,
      });
    }
  } else {
    throw new CustomError.BasicAPIError(
      `This user doesn't have an active game, please, create one first.`,
      400
    );
  }
};

module.exports = { playGame };
