const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { name, password } = req.body;

  const nameTaken = await User.findOne({ name });
  if (nameTaken) {
    throw new CustomError.BadRequestError("This name already taken");
  }

  const user = await User.create({ name, password });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    throw new CustomError.BadRequestError("Please, provide name and password");
  }
  const user = await User.findOne({ name });

  if (!user) {
    throw new CustomError.BadRequestError("No such name registered");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.BadRequestError("Incorrect name or password");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "You've logged out" });
};

module.exports = {
  register,
  login,
  logout,
};
