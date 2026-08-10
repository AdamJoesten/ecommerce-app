import z from "zod";

export const GetOrderRequestSchema = z.object({
    params: z.object({ id: z.uuid() })
})

export type getOrderRequest = z.infer<typeof GetOrderRequestSchema>;