import { CreateUserDto } from "../in/createUserDto";

export class CreateUser {
    constructor(private readonly createUserDto: CreateUserDto) { }
    execute = async () => {
        
    }
}