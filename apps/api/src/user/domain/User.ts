import { Date, Email, UUID } from "../../lib/contracts/common";

export interface IUser {
    id: UUID,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    email: Email
}

export class User implements IUser {
    constructor(
        readonly id: UUID,
        readonly firstName: string,
        readonly lastName: string,
        readonly dateOfBirth: Date,
        readonly email: Email,
    ) { }
}