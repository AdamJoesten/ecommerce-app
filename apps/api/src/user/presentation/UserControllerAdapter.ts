import { injectable, inject } from "tsyringe";
import { BaseControllerAdapter } from "../../common/adapters/BaseControllerAdapter";
import { type RequestHandler } from "express";
import { UserController } from "./UserController";
import { User } from "../domain/User";
import { CreateUserDtoSchema } from "../in/createUserDto";

@injectable()
export class UserControllerAdapter extends BaseControllerAdapter {

    constructor(private readonly controller: UserController) {
        super()
    }

    getUser: RequestHandler = async (req, res, next) => {
    }

    createUser: RequestHandler = async (req, res, next) => {
        const dto = CreateUserDtoSchema.parse(req.body)
        const response = this.controller.createUser(dto);
    } 
}