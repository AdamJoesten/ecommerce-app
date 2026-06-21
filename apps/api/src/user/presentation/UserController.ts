import { injectable } from "tsyringe";
import { BaseController } from "../../common/presentation/BaseController";
import { IUser } from "../domain/User";
import { CreateUserDto } from "../in/createUserDto";

@injectable()
export class UserController extends BaseController {
    constructor() {
        super()
    }

    createUser = async (dto: CreateUserDto) => {
        const createUserResponseDto = await new CreateUserUseCase().execute()
    }

}