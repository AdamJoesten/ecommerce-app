import { Router } from 'express';
import { userRouter } from './user/userRouter';
import { productRouter } from './product/productRouter';

const v1Router: Router = Router();

v1Router.use("/user", userRouter);
v1Router.use("/product", productRouter);
v1Router.use("/health", healthRouter)

export { v1Router };