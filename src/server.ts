// ENTRY POINT
import mongoose from "mongoose";
import config from "./config/config";
import { logger } from "./config/logger";
import app from "./app";
import nodecron from "node-cron";
import { calculateRevenue } from "./services/revenueService";

let server: any;

mongoose
  .connect(config.mongoose.url, {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
  })
  .then(async () => {
    logger.info("[✅] Connected to MongoDB");
    server = app.listen(config.port, () => {
      logger.info(`[✅] Test app is listening to port ${config.port}`);
    });
    nodecron.schedule("0 0 * * *", async () => {
      await calculateRevenue();
    });
  });

// Escape hatch

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    logger.info("Server closed");
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  // exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
