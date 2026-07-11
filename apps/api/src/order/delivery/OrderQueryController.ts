import { injectable } from "tsyringe";
import { type GetOrderUseCase } from "../application/GetOrderUseCase";

@injectable()
export class OrderQueryController {
    constructor(private readonly getOrderUseCase: GetOrderUseCase) {

    }

    getOrder = async () => {
        this.getOrderUseCase.execute();
    }
}