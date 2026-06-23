import { injectable, inject } from "tsyringe";
import { type IUserRepository } from "../../domain/IUserRepository";
import { CreateUserDto } from "../in/createUserDto";
import { User } from "../../domain/User";
import { UuidSchema } from "../../../lib/contracts/common";

@injectable()
export class CreateUser {
    constructor(
        @inject("IUserRepository") private readonly repository: IUserRepository,
    ) { }

    execute = async (dto: CreateUserDto) => {
        const id = UuidSchema.parse(crypto.randomUUID());
        const user = new User(id, dto.firstName, dto.lastName, dto.dateOfBirth, dto.email)
        const result = this.repository.createUser(user);
        return result;
    }
}