import z from "zod";
import { randomUUID } from "node:crypto";

type PrincipalInternalUuid = string & { readonly __brand: "PrincipalInternalUuid"};

export const PrincipalExternalUuidSchema = z.uuid().brand("PrincipalExternalUuid");
type PrincipalExternalUuid = z.infer<typeof PrincipalExternalUuidSchema>;

export class Principal {

    private constructor(
        private readonly internalId: PrincipalInternalUuid,
        private readonly externalId: PrincipalExternalUuid) { };

    public static create(rawExternalId: string) {
        const internalId = randomUUID() as PrincipalInternalUuid;
        const externalId = PrincipalExternalUuidSchema.parse(rawExternalId);

        return new Principal(internalId, externalId);
    }
}


