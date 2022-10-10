const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  points: Number,
  rank: Number,
  createdAt: Date,
});

module.exports = mongoose.model("Result", resultSchema);
