import express, { type Express } from "express";
import { v1Router as ecommerceV1Router } from "./api/v1/v1Router";
import { errorHandler } from "./platform/infrastructure/http/middleware/errorHandler";
import helmet from "helmet";
import requestLogger from "./platform/requestLogger";

const app: Express = express();

app.use(express.json());
app.use(helmet());
app.use(requestLogger);

app.use("/ecommerce/api", ecommerceV1Router);
app.use(...errorHandler());

export { app };
