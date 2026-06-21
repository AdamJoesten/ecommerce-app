import z from "zod";
import { NameSchema, DateSchema, EmailSchema } from "../../../lib/contracts/common";

export const CreateUserDtoSchema = z.object({
    firstName: NameSchema,
    lastName: NameSchema,
    dateOfBirth: DateSchema,
    email: EmailSchema
})

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;