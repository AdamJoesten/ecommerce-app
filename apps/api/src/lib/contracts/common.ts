import z from "zod";

export const EmailSchema = z.email().brand<"EmailSchema">();
export type Email = z.infer<typeof EmailSchema>

export const DateSchema = z.date().brand<"DateSchema">();
export type Date = z.infer<typeof DateSchema>;

export const UuidSchema = z.uuid().brand<"UuidSchema">();
export type UUID = z.infer<typeof UuidSchema>;

export const NameSchema = z.string().min(1).brand<"NameSchema">();
export type Name = z.infer<typeof NameSchema>