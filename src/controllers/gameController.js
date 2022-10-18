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
  const currentGame = await Game.findOne({ user: req.user.userId });
  if (currentGame) {
    if (typeof x === "undefined" || typeof y === "undefined") {
      res.status(StatusCodes.OK).json({
        msg: "Coordinates were not provided, so here is your current game state",
        // field: currentGame.field,
        uncoveredField: currentGame.uncoveredField,
        width: currentGame.width,
      });
    } else {
      [x, y] = sanitizeTurn(x, y, currentGame);
      if (Service.checkIfLost(x, y, currentGame.field)) {
        currentGame.uncoveredField[y][x] = "m";
        await Game.deleteOne({
          user: req.user.userId,
        });
        res.status(StatusCodes.OK).json({
          msg: "Game over",
          field: currentGame.field,
          uncoveredField: currentGame.uncoveredField,
          width: currentGame.width,
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
          { user: req.user.userId },
          { uncoveredField: newUncoveredField }
        );
        res.status(StatusCodes.OK).json({
          msg: "Turn made",
          // field: currentGame.field,
          uncoveredField: currentGame.uncoveredField,
          width: currentGame.width,
        });
      }
    }
  } else {
    throw new CustomError.NotFoundError(
      `This user doesn't have an active game, please, create one first.`,
      404
    );
  }
};

module.exports = { playGame };
