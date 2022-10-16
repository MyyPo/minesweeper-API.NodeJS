require("dotenv").config();
const cors = require("cors");
const express = require("express");
require("express-async-errors");
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

const connectDB = require("./db/connect");

// models
const Game = require("./models/Game");
const User = require("./models/User");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// routes
const startRoutes = require("./routes/startRoutes");
app.use("/api/v1/start", startRoutes);
const miscRoutes = require("./routes/miscRoutes");
app.use("/api/v1/misc", miscRoutes);
const gameRoutes = require("./routes/gameRoutes");
app.use("/api/v1/game", gameRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB("mongodb://mongo:27017");
    app.listen(port, () => console.log(`Express App is running on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

// activate middleware
app.use(errorHandlerMiddleware);

start();
