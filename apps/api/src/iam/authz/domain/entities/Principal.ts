import z from "zod";
import { randomUUID } from "node:crypto";

export const PrincipalInternalUuidSchema = z.uuid().brand("PrincipalInternalUuid");
type PrincipalInternalUuid = z.infer<typeof PrincipalInternalUuidSchema>;

export const PrincipalExternalUuidSchema = z.uuid().brand("PrincipalExternalUuid");
type PrincipalExternalUuid = z.infer<typeof PrincipalExternalUuidSchema>;

export class Principal {

    private constructor(
        private readonly internalId: PrincipalInternalUuid,
        private readonly externalId: PrincipalExternalUuid) { };

    public static create(rawExternalId: string) {
        const internalId = PrincipalInternalUuidSchema.parse(randomUUID())
        const externalId = PrincipalExternalUuidSchema.parse(rawExternalId);

        return new Principal(internalId, externalId);
    }
}

const principal = Principal.create(randomUUID())

