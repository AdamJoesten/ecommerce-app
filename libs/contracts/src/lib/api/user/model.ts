import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "../../common/validations.ts";

// import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.email(),
	dateOfBirth: z.date(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const GetUserSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});