import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { User } from "@ecommerce/contracts";
import { UserRepository } from "./UserRepository";
import { app } from "../../../server";

const mockUsers: User[] = [
    {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        dateOfBirth: new Date("1995-08-07"),
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-06"),
    },
    {
        id: 2,
        name: "Robert",
        email: "robert@example.com",
        dateOfBirth: new Date("1994-08-07"),
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-06"),
    },
];

describe("GET /api/v1/user", () => {
    beforeEach(() => {
        jest.spyOn(UserRepository.prototype, "findAllAsync").mockResolvedValue(mockUsers);
        jest.spyOn(UserRepository.prototype, "findByIdAsync").mockImplementation(
            async (id: number) => mockUsers.find((u) => u.id === id) ?? null
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("returns all users", async () => {
        const res = await request(app).get("/api/v1/user");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.success).toBe(true);
        expect(res.body.responseObject).toHaveLength(mockUsers.length);
    });

    it("returns a user by id", async () => {
        const res = await request(app).get("/api/v1/user/1");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.success).toBe(true);
        expect(res.body.responseObject.id).toBe(1);
    });

    it("returns 404 for a non-existent user", async () => {
        const res = await request(app).get("/api/v1/user/999");
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        expect(res.body.success).toBe(false);
    });
});
