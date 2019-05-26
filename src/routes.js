const express = require("express");
const routes = express.Router();

const SessionController = require("./app/controllers/Sessioncontroller");

routes.post("/sessions", SessionController.store);

module.exports = routes;
