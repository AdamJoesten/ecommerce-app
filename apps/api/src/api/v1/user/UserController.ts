import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "@ecommerce/contracts";
import { UserService } from "./UserService";
import { injectable } from 'tsyringe'


@injectable()
export class UserController {
    constructor(private readonly userService: UserService) { }

    public getUsers: RequestHandler = async (_req, res) => {
        const users = await this.userService.findAll();
        res.status(StatusCodes.OK).json(ApiResponse.success('Users found', users));
    };

    public getUser: RequestHandler = async (req, res) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const user = await this.userService.findById(id);
        res.status(StatusCodes.OK).json(ApiResponse.success('User found', user));
    };
}

