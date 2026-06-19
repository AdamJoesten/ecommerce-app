import { injectable } from 'tsyringe';
import { User } from '@ecommerce/contracts';
import { BaseRepository } from '../../../common/BaseRepository';
import type { DrizzleClient } from '../../../db';

export interface IUserRepository {
    findAllAsync: () => Promise<User[]>
    findByIdAsync: (_id: number) => Promise<User | null>
}

@injectable()
export class UserRepository extends BaseRepository implements IUserRepository {
    constructor(private readonly client: DrizzleClient) {
        super(client)
    }
    async findAllAsync(): Promise<User[]> {
        try { return [] } catch (error) {
            this.handleError(error)
        }
    }

    async findByIdAsync(id: number): Promise<User | null> {
        try { return null } catch (error) {
            this.handleError(error)
        }
    }
}
