import z from "zod";
import { DateSchema, EmailSchema, NameSchema, UuidSchema } from "../../../lib/contracts/common";

export const GetUserResponseDtoSchema = z.object({
    id: UuidSchema,
    firstName: NameSchema,
    lastName: NameSchema,
    dateOfBirth: DateSchema,
    email: EmailSchema
})

export type GetUserResponseDto = z.infer<typeof GetUserResponseDtoSchema>;