const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

const connectDB = require("./db/connect");

// models
const Game = require("./models/Game");
const User = require("./models/User");

// middleware
const notFoundMiddleware = require("./middleware/not-found");

// routes
const startRoutes = require("./routes/startRoutes");
app.use("/api/v1/start", startRoutes);

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB("mongodb://mongo:27017");
    app.listen(port, () => console.log(`Express App is running on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
