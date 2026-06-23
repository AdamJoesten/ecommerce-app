import { injectable, inject } from "tsyringe";
import { type IUserRepository } from "../../domain/IUserRepository";
import { NotFoundError } from "../../../common/errors";

@injectable()
export class GetUser {
    constructor(
        @inject("IUserRepository") private repository: IUserRepository,
    ) { }

    execute = async () => {
        const result = await this.repository.getUser();
        if (!result) throw new NotFoundError();
        return result;
    }
}