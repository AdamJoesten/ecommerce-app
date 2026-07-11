import { RequestHandler } from "express";
import { injectable } from 'tsyringe';
import { type OrderQueryController } from "../../../delivery/OrderQueryController";
import { AdaptedController } from "../../../../platform/infrastructure/http/types/AdaptedController";

@injectable()
export class ExpressOrderQueryControllerAdapter implements AdaptedController<OrderQueryController> {
    constructor(private readonly orderQueryController: OrderQueryController) { }

    getOrder: RequestHandler = async (req, res, next) => {
        this.orderQueryController.getOrder();
    }
}