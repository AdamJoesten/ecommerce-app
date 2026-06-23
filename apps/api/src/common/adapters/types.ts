import { RequestHandler } from "express";

export type AdaptedController<T> = {
    [K in keyof T]: RequestHandler
}