import { injectable, inject } from "tsyringe";
import { type RequestHandler } from "express";
import { IUserController, UserController } from "./UserController";
import { User } from "../domain/User";
import { CreateUserDtoSchema } from "../application/in/createUserDto";
import { AdaptedController } from "../../common/adapters/types";
import { GetUserResponseDtoSchema } from "../application/out/getUserResponseDto";

@injectable()
export class UserControllerAdapter implements AdaptedController<IUserController> {

    constructor(private readonly controller: UserController) { }

    getUser: RequestHandler = async (_req, res, next) => {
        const response = GetUserResponseDtoSchema.parse()
    }

    createUser: RequestHandler = async (req, res, next) => {
        const dto = CreateUserDtoSchema.parse(req.body)
        const response = this.controller.createUser(dto);
    }
}