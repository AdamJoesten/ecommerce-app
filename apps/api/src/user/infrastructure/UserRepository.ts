import { BaseRepository } from "../../common/infrastructure/BaseRepository";
import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export class UserRepository extends BaseRepository implements IUserRepository {
    constructor() { }

    getUser = async () => {
        try {
            return null;
        } catch (error) {
            this.handleError(error)
        }
    }

    createUser = async (user: User) => {
        try {

        } catch (error) {
            this.handleError(error)
        }
    }
}