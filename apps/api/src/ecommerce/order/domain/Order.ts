import { randomUUID } from "crypto";

type OrderUuid = string & { readonly __brand: "OrderUuid" };

export class Order {
    private constructor(private readonly orderUuid: OrderUuid) { }

    static create() {
        const orderUuid = randomUUID() as OrderUuid;
        return new Order(orderUuid);
    }
}