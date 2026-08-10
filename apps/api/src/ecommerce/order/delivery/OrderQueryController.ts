import { injectable } from "tsyringe";
import { GetOrderUseCase } from "../application/GetOrderUseCase";

@injectable()
export class OrderQueryController {
    constructor(private readonly getOrderUseCase: GetOrderUseCase) { }

    getOrder = async (id: string) => {
        return await this.getOrderUseCase.execute(id);
    }
}