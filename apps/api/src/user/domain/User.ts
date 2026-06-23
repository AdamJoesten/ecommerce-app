import { Date, Email, UUID } from "../../lib/contracts/common";

export class User {
    constructor(
        readonly id: UUID,
        readonly firstName: string,
        readonly lastName: string,
        readonly dateOfBirth: Date,
        readonly email: Email,
    ) { }
}