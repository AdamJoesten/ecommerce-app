import "reflect-metadata";
import { app } from "./server";


// const server = app.listen(env.PORT, () => {
// 	const { NODE_ENV, HOST, PORT } = env;
// 	logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
// });

const server = app.listen(8000, () => {
console.log("listening ")
});


process.on("SIGINT", () => { });
process.on("SIGTERM", () => { });