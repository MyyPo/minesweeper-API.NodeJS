const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mode: {
    type: String,
    required: [true, "Please choose game mode"],
    immutable: true,
    enum: {
      values: ["custom", "ranked"],
      message: "There is no such mode",
    },
  },
  field: [Array],
});

module.exports = mongoose.model("Game", gameSchema);
