import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./error.middleware";
import { config } from "../config";

const setupMiddleware = (app: express.Express): void => {
  // Security
  app.use(helmet());
  // CORS configuration
  app.use(
    cors({
      origin: ["https://www.trywatchwise.com", "https://trywatchwise.com", "http://localhost:3000"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "User-Timezone", "Google-Provider-Token"],
    })
  );

  // Request Parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging
  app.use(morgan("dev"));

  app.use(errorHandler as any);
};

export default setupMiddleware;
