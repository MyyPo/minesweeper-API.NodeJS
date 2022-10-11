const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Service = require("../services");

// models
const Game = require("../models/Game");
const User = require("../models/User");

const deleteGame = async (req, res) => {
  try {
    const akn = await Game.deleteMany({
      user: "634301e805c36e40e3ba2843",
    });
    if (akn.deletedCount > 0) {
      res.status(StatusCodes.OK).json({ msg: "Game successfully deleted" });
    } else {
      throw new CustomError.BasicAPIError("You have no game to delete", 400);
    }
  } catch (error) {
    throw new CustomError.BasicAPIError(error, 500);
  }
};

module.exports = { deleteGame };
