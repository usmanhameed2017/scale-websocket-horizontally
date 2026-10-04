const { redis } = require("../redis/connection"); 
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

// Send private message
const sendPrivateMessage = asyncHandler(async (request, response) => {
    // Get request body
    const { senderId, recipientId, text } = request.body;

    // Publisher instance
    const publisher = redis;

    // Publish events
    const [publishChat, publishNotification] = await Promise.all([
        publisher.publish("chat", JSON.stringify({ senderId, recipientId, text })), // For private
        publisher.publish("notifications", JSON.stringify({ greetMessage: "Have a nice day!" })) // For public
    ]);

    // Validate
    if(!publishChat) throw new ApiError(500, "Failed to publish on chat channel");
    if(!publishNotification) throw new ApiError(500, "Failed to publish on notifications channel");
    
    // Response
    return response.status(200).json(new ApiResponse(200, text, "Message has been sent"));
});

module.exports = { sendPrivateMessage };