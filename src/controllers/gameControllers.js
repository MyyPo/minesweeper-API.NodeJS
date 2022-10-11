const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Service = require("../services");

//
const sanitizeTurn = require("../utils/sanitizeTurn");

// models
const Game = require("../models/Game");
const User = require("../models/User");

const playGame = async (req, res) => {
  const { x, y } = req.body;

  if (await Game.exists({ user: "634301e805c36e40e3ba2843" })) {
    let game = Game.findOne({ user: "634301e805c36e40e3ba2843" });
    [x, y] = sanitizeTurn(x, y, game);

    game = Service.uncoverCoords(x, y, game.field, game.width, game.height);
    game.save();
  } else {
    throw new CustomError.BasicAPIError(
      `This user doesn't have an active game, please, create one first.`,
      400
    );
  }
};

module.exports = { playGame };
