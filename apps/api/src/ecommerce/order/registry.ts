import { orderContainer } from "../../registry";
import { IOrderRepository } from "./application/GetOrderUseCase";
import { Order } from "./domain/Order";


orderContainer.register<IOrderRepository>("IOrderRepository", {
  useValue: {
    getOrderById: async () => Order.create(),
  },
});

export { orderContainer };