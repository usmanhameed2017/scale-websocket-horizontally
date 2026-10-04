const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const { corsOptions, PORT } = require("./constants");
const initializeSubscriber = require("./redis/subscriber");
const { socketInterceptor } = require("./middlewares/socket.middleware");
const connectSocket = require("./utils/connectSocket");

// Initialize express app
function startApp()
{
    // Express app instance
    const app = express();

    // Middlewares
    app.use(cors(corsOptions));
    app.set("trust proxy", 1);
    app.use(express.urlencoded({ extended: true, limit: "50kb" }));
    app.use(express.json({ limit: "50kb" }));

    // Create http server
    const server = http.createServer(app);

    // Bind with socket server
    const io = new Server(server, { cors: corsOptions, transports: ["websocket"] });

    // Make io accessible to app
    app.set("io", io);

    // Initialize subscriber
    initializeSubscriber(io);

    // Socket middleware
    io.use(socketInterceptor);

    // Socket connection
    connectSocket(io);

    // Start server
    server.on("error", () => console.log("Failed to start server"));
    server.listen(PORT, () => console.log(`Server is up and running at port ${PORT}`));
}

module.exports = { startApp };