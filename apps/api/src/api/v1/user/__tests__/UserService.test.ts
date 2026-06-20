import { container } from "tsyringe";
import { UserService } from "../UserService";
import { UserRepository } from "../UserRepository";
import { User } from "@ecommerce/contracts";
import { NotFoundError } from "../../../../common/errors";

const mockUser: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    dateOfBirth: new Date("1982-06-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
};

class MockUserRepository {
    async findAllAsync(): Promise<User[]> {
        return [mockUser];
    }
    async findByIdAsync(id: number): Promise<User | null> {
        return id === mockUser.id ? mockUser : null;
    }
}

describe("UserService", () => {
    let userService: UserService;
    let testContainer: typeof container;

    beforeEach(() => {
        testContainer = container.createChildContainer();
        testContainer.register(UserRepository, { useClass: MockUserRepository });
        userService = testContainer.resolve(UserService);
    });

    describe("findAll", () => {
        it("returns users when found", async () => {
            const users = await userService.findAll();
            expect(users).toEqual([mockUser]);
        });
    });

    describe("findById", () => {
        it("returns the user when found", async () => {
            const user = await userService.findById(1);
            expect(user).toEqual(mockUser);
        });

        it("throws NotFoundError when the user does not exist", async () => {
            await expect(userService.findById(999)).rejects.toThrow(NotFoundError);
        });
    });
});
