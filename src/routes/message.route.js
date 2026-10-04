const { Router } = require("express");
const { sendPrivateMessage } = require("../controllers/message.controller");

// Router instance
const messageRouter = Router();

// Send private message
messageRouter.route("/").post(sendPrivateMessage);

module.exports = messageRouter;