import { RequestHandler } from "express";

type MethodKeys<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never }

export type AdaptedController<T> = {
    [K in keyof MethodKeys<T>]: RequestHandler
}

