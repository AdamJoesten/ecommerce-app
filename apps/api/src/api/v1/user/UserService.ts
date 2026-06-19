import { User } from '@ecommerce/contracts';
import { inject, injectable } from 'tsyringe';
import { NotFoundError } from '../../../common/errors';
import type { IUserRepository } from './UserRepository';

@injectable()
export class UserService {
    constructor(@inject("IUserRepository") private readonly userRepository: IUserRepository) { }

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.findAllAsync();
        if (!users || users.length === 0) throw new NotFoundError('No users found');
        return users;
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findByIdAsync(id);
        if (!user) throw new NotFoundError('User not found');
        return user;
    }
}
