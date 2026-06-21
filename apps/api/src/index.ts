import "reflect-metadata";
import { env } from "./env";
import { app } from "./api/server";
import { db, pool } from "./db";



const main = async () => {

  const server = app.listen(env.apiPort, () => {
    console.log(`Listening at http://localhost:${env.apiPort}/`);
  });

  // Server
  server.on("error", console.error);


  // Process
  const closePool = async () => {
    console.info("Closing db client connection");
    await pool.end()
  }

  const handleShutdown = () => {
    server.close(async () => {
      await closePool();
      console.info("Shutting down...");
      process.exit(0)
    })

    setTimeout(() => process.exit(1), 10_000).unref()
  }

  const handleFatal = (error: unknown) => {
    console.error(error);

    closePool().then(() => {
      console.info("Shutting down...");
      process.exit(1);
    })
  }

  process.on("SIGINT", handleShutdown)
  process.on("SIGTERM", handleShutdown)
  process.on("uncaughtException", handleFatal)
  process.on("unhandledRejection", handleFatal)

}

main().catch(() => {
  console.error("Error initializing server...");
  process.exit(1);
})