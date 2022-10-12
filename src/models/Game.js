const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
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
  uncoveredField: [Array],
  flaggedField: [Array],
  width: { type: Number, required: true, immutable: true },
  height: { type: Number, required: true, immutable: true },
});

module.exports = mongoose.model("Game", gameSchema);
