import { User } from "./User";

export interface IUserRepository {
    createUser: (user: User) => Promise<User>
    getUser: () => Promise<User | null>
}