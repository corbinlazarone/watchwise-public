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
  const corsOptions = {
    origin: function(origin: any, callback: any) {
      const allowedOrigins = [
        'https://www.trywatchwise.com', 
        'https://trywatchwise.com', 
        'http://localhost:3000'
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'User-Timezone', 'Google-Provider-Token'],
    exposedHeaders: ['Access-Control-Allow-Origin'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

  app.use(cors(corsOptions));

  // Request Parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging
  app.use(morgan("dev"));

  app.use(errorHandler as any);
};

export default setupMiddleware;
