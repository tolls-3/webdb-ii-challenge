const express = require("express");
const server = express();
const carRouter = require("../cars/cars");

server.use(express.json());
server.use("/api/cars", carRouter);

module.exports = server;
