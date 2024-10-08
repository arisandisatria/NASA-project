const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGODB_CONN;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Mongo connection ready...");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}

startServer();
