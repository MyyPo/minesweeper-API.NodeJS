const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide player nickname"],
    immutable: true,
  },
  rank: Number,
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestResults: { type: Number },
});

module.exports = mongoose.model("User", userSchema);
