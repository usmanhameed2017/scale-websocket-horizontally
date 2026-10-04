const socketInterceptor = (socket, next) => {
    // Join room
    socket.on("joinRoom", ({ userId }) => {
        if(userId)
        {
            socket.join(userId);
            console.log(`User has joined room ${userId}`);
        }         
    });

    // Escrow
    socket.on("joinOrderRoom", ({ orderId }) => {
        socket.join(orderId);
        console.log(`Order room has joined ${orderId}`);
    });
        
    return next();
};

module.exports = { socketInterceptor };