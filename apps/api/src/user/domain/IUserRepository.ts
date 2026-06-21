import { CreateUserResponseDto } from "../application/out/createUserResponseDto";

export interface IUserRepository {
    getUser: () => Promise<CreateUserResponseDto>
}