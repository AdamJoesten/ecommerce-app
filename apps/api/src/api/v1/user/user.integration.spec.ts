import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { app } from "../../../server";

const hasDatabase = !!process.env.DATABASE_URL;

(hasDatabase ? describe : describe.skip)("User API (integration)", () => {
    // TODO: seed known users before each test and wipe after once real queries are in place

    it("GET /api/v1/user returns users", async () => {
        const res = await request(app).get("/api/v1/user");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.success).toBe(true);
    });

    it("GET /api/v1/user/:id returns a user", async () => {
        const res = await request(app).get("/api/v1/user/1");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.success).toBe(true);
    });

    it("GET /api/v1/user/:id returns 404 for a missing user", async () => {
        const res = await request(app).get("/api/v1/user/999999");
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        expect(res.body.success).toBe(false);
    });
});
