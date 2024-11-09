"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

// DB connection
require("./server");

const PORT = process.env.PORT || 8000;

// Swagger setup
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "A simple API for managing todos",
    },
    servers: [
      {
        url: process.env.HEROKU_URL || "http://127.0.0.1:8000",
      },
    ],
  },
  apis: ["./src/routes/todoRouter.js"],
};

// Swagger docs oluşturma
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI ile API dokümantasyonu arayüzünü başlatma
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/********************************************************************/

// Middlewares:

// CORS Middleware: Allow requests from specific origin (frontend domain)
const corsOptions = {
  origin: process.env.HEROKU_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middleware for parsing incoming JSON requests
app.use(express.json());

// Handle async errors in the application using express-async-errors
require("express-async-errors");

// Rate limiting to prevent too many requests from a single IP
// This is to protect the API from DDoS or brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Allow only 100 requests per IP in the time window
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter); // Apply rate limiting to all incoming requests

// Welcome route to indicate the server is up
app.get("/", (req, res) => {
  res.send("Welcome to the Todo API! The server is up and running.");
});

// Route for Todo-related operations
app.use("/todo", require("./src/routes/todoRouter"));

// Helmet secures your app by setting various HTTP headers to protect against common vulnerabilities.
app.use(helmet());

// Sanitize user input to prevent NoSQL injection attacks
app.use(mongoSanitize());

// Error handler middleware to catch and respond to errors
app.use(require("./src/middlewares/errorHandler"));

/********************************************************************/

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
