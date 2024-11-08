"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// DB connection
require("./server");

const PORT = process.env.PORT || 8000;

// Swagger setup
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // OpenAPI sürümünü belirtiyoruz
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Todo API için Swagger dokümantasyonu",
    },
    servers: [
      {
        url: `http://127.0.0.1:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"], // API'lerinizin bulunduğu dosya yolu
};

// Swagger docs oluşturma
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI ile API dokümantasyonu arayüzünü başlatma
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/********************************************************************/

// Middlewares:

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
