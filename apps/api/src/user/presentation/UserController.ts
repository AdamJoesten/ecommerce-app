import { injectable } from "tsyringe";
import { BaseController } from "../../common/presentation/BaseController";
import { CreateUserDto } from "../application/in/createUserDto";
import { CreateUserResponseDto } from "../application/out/createUserResponseDto";
import { GetUserResponseDto } from "../application/out/getUserResponseDto";
import { CreateUser } from "../application/usecases/CreateUser";
import { GetUser } from "../application/usecases/GetUser";

export interface IUserController {
    getUser: () => Promise<GetUserResponseDto>
    createUser: () => Promise<CreateUserResponseDto>
}

@injectable()
export class UserController extends BaseController {
    constructor(
        private readonly createUserUseCase: CreateUser,
        private readonly getUserUseCase: GetUser
    ) {
        super()
    }

    getUser = async () => {
        const getUserResponseDto = await this.getUserUseCase.execute();
        return getUserResponseDto;
    }

    createUser = async (dto: CreateUserDto) => {
        const createUserResponseDto = await this.createUserUseCase.execute(dto);
        return createUserResponseDto;
    }

}