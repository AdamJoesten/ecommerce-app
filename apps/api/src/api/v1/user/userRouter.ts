import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import { container } from 'tsyringe';
import { GetUserSchema, UserSchema } from '@ecommerce/contracts'
import { UserController } from './UserController';
import { createApiResponse } from '../api-docs/openAPIResponseBuilder';
import { validateRequest } from '../../../common/validateRequest';
import z from 'zod'

const userRegistry = new OpenAPIRegistry();
const userRouter: Router = Router();
const userController = container.resolve(UserController);

userRegistry.register("User", UserSchema);

userRegistry.registerPath({
    method: "get",
    path: "/users",
    tags: ["User"],
    responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRouter.get("/", userController.getUsers);

userRegistry.registerPath({
    method: "get",
    path: "/users/{id}",
    tags: ["User"],
    request: { params: GetUserSchema.shape.params },
    responses: createApiResponse(UserSchema, "Success"),
});

userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser);

export { userRouter, userRegistry }