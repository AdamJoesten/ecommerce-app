import z from "zod";
import { DateSchema, EmailSchema, NameSchema, UuidSchema } from "../../../lib/contracts/common";

export const CreateUserResponseDtoSchema = z.object({
    id: UuidSchema,
    firstName: NameSchema,
    lastName: NameSchema,
    dateOfBirth: DateSchema,
    email: EmailSchema
})

export type CreateUserResponseDto = z.infer<typeof CreateUserResponseDtoSchema>;