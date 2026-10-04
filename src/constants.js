// Port
const PORT = process.env.PORT || 8001;

// Cors options
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = { corsOptions, PORT };