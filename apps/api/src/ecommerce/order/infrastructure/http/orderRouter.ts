import express, { Router } from 'express';
import { ExpressOrderQueryControllerAdapter } from '../adapters/input/ExpressOrderQueryControllerAdapter';
import { orderContainer } from '../../registry'

export const orderRouter: Router = express.Router();
const orderAdapter = orderContainer.resolve(ExpressOrderQueryControllerAdapter);

orderRouter.get("/:id", orderAdapter.getOrder)