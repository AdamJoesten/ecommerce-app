import { inject, injectable } from "tsyringe";
import { Order } from "../domain/Order";

export interface IOrderRepository {
  getOrderById: (id: string) => Promise<Order>;
}

@injectable()
export class GetOrderUseCase {
  constructor(@inject("IOrderRepository") private readonly repository: IOrderRepository) {}

  public execute = async (id: string) => {
    return await this.repository.getOrderById(id);
  };

  async test(id: string) {
    return await this.repository.getOrderById(id);
  }
}
