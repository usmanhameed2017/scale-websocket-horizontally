// Socket connection
function connectSocket(io)
{
    // Connect
    io.on("connection", (socket) => {
        console.log("Socket connected!", socket.id);

        // Disconnect
        socket.on("disconnect", () => console.log("Socket disconnected!", socket.id));
    });
}

module.exports = connectSocket;