import { date, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: uuid().primaryKey(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    dateOfBirth: date().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow()
});
