// imports
const express = require("express");
const cors = require("cors");

// routes
const configureRoutes = require("./config/routes");

// instantiate server
const server = express();

// server use
server.use(express.json());
server.use(cors());

configureRoutes(server);

module.exports = {
  server
};