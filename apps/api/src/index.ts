import "reflect-metadata";
import { app } from "./server";
import { loggerFactory } from "@ecommerce/logging"

const main = async () => {
    const logger = loggerFactory()
    const handleShutdown = () => {
        server.close(() => {
            process.exit()
        })
        setTimeout(() => process.exit(1), 10000).unref();
    }

    const handleCrash = () => {

    }

    process.on("SIGINT", handleShutdown);
    process.on("SIGTERM", handleShutdown);
    process.on("uncaughtException", handleCrash);
    process.on("unhandledRejection", handleCrash);

    const server = app.listen(env.PORT, () => {
        const { NODE_ENV, HOST, PORT } = env;
        logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
    });

}

main()
    .catch((error) => {
        console.error()
    })
    .finally(() => {

    })