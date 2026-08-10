import { Router } from "express";
import { healthRouter } from "../../platform/infrastructure/http/routes/healthRouter";
import { AuthNRouter } from "../../iam/authn/infrastructure/http/routes/authNRouter";
import { orderRouter } from "../../ecommerce/order/infrastructure/http/orderRouter";

const v1Router: Router = Router();

v1Router.use("/v1/health", healthRouter);
v1Router.use("/v1/authn", AuthNRouter);
v1Router.use("/v1/order", orderRouter);

export { v1Router };
