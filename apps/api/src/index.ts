import "reflect-metadata";
import "./registry";
import { app } from "./server";
import { loggerFactory } from "@ecommerce/logging";
import { env } from "./platform/env";
import { closeDbConnection } from "./platform/db";
import { Server } from "node:http";

const logger = loggerFactory();

const releaseResources = async () => {
  await closeDbConnection().catch((error) =>
    logger.error(error, "Error closing DB pool during shutdown"),
  );
};

const handleShutdown = (server: Server) => () => {
  server.close(() => {
    releaseResources().finally(() => process.exit());
  });
  setTimeout(() => {
    logger.error("Server failed to exit within timeout limit.");
    process.exit(1);
  }, 10000).unref();
};

const handleCrash = (server: Server, message: string) => () => {
  server.close(() => {
    releaseResources().finally(() => process.exit(1));
  });
  logger.error(message);
  setTimeout(() => {
    logger.error("Server failed to exit within timeout limit.");
    process.exit(1);
  }, 10000).unref();
};

const main = async () => {
  const server = app.listen(env.PORT, () => {
    const { HOST, PORT } = env;
    logger.info(`Server running on port http://${HOST}:${PORT}`);
  });

  process.on("SIGINT", handleShutdown(server));
  process.on("SIGTERM", handleShutdown(server));
  process.on("uncaughtException", handleCrash(server, "Uncaught Exception"));
  process.on("unhandledRejection", handleCrash(server, "Uncaught Rejection"));
};

main().catch((error) => {
  logger.error(error);
});
