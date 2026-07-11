import { randomUUID } from "crypto";
import z from "zod";

const orderUuidSchema = z.uuid().brand("OrderUuid");
type OrderUuid = z.infer<typeof orderUuidSchema>;

export class Order {
    private constructor(private readonly orderUuid: OrderUuid) { }

    static create() {
        const orderUuid = orderUuidSchema.parse(randomUUID());
        return new Order(orderUuid);
    }
}