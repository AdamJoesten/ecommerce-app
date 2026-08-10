import { RequestHandler } from "express";
import { injectable } from "tsyringe";
import { OrderQueryController } from "../../../delivery/OrderQueryController";
import { AdaptedController } from "../../../../../platform/infrastructure/http/types/AdaptedController";
import { GetOrderRequestSchema } from "./dto";
import { parse } from "../../../../../platform/infrastructure/http/validation";
import { ApiResponse } from "@ecommerce/contracts";

@injectable()
export class ExpressOrderQueryControllerAdapter implements AdaptedController<OrderQueryController> {
  constructor(private readonly orderQueryController: OrderQueryController) {}

  getOrder: RequestHandler = async (req, res, next) => {
    const {
      params: { id },
    } = parse(GetOrderRequestSchema, req);
    const order = await this.orderQueryController.getOrder(id);
    const response = ApiResponse.success("Order found.", order);
    res.json(response);
  };
}
