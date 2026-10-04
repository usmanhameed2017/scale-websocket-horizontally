const { redis } = require("./connection");

// Initialize subscriber
const initializeSubscriber = (io) => {
    // Subscriber instance
    const subscriber = redis;

    // Channel names
    const channels = ["chat", "notifications"];

    // Subscribe to all channels
    channels.forEach((channel) => {
        subscriber.subscribe(channel, (error) => {
            if(error) return console.log(`Failed to subscribe ${channel}. Error: ${error.message}`);
            return console.log(`Subscribed to ${channel} channel`);
        });
    });

    // Attach listener
    subscriber.on("message", (channel, payload) => {
        // Channel info
        console.log(`Message recieved on "${channel}" channel`);

        // Parse data
        const data = JSON.parse(payload);

        // Chat
        if(channel === "chat")
        {
            // Destructure
            const { senderId, recipientId, text } = data;

            // Emit real-time
            io.to(senderId).to(recipientId).emit("privateMessage", text);
            return;
        }

        // Notifications
        if(channel === "notifications")
        {
            // Destructure
            const { greetMessage } = data;

            // Emit real-time
            io.emit("notifications", greetMessage);
            return;
        }     
    });
};

module.exports = initializeSubscriber;