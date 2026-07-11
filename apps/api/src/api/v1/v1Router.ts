import { Router } from 'express';
import { healthRouter } from '../../platform/infrastructure/http/routes/healthRouter';


const v1Router: Router = Router();


v1Router.use("/health", healthRouter)

export { v1Router };