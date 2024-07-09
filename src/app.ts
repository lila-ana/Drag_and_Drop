import express, { Application } from "express";
import session from "express-session";

import { attachEntityManager } from "./middlewares/attachEntityManager";
import routes from "./routes/v1";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { errorHandler } from "./middlewares/errorHandler";

// Initialize Express application
const app: Application = express();

// ===========> Middleware <============
app.use(express.json()); // For parsing application/json
app.use(attachEntityManager); // Custom middleware to attach EntityManager

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key", // Use a strong secret key in production and store it in an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // Session expiration time in milliseconds (e.g., 1 hour)
    },
  })
);

// Routes
app.use("/api", routes);

// =============> Error handling middleware <===========

// 404 Not Found Middleware
app.use(notFoundHandler);

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
