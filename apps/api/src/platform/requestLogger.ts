import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pino from "pino";
import pinoHttp from "pino-http";
import { env } from "./env";

const SHOULD_LOG_RESPONSE_BODY = env.LOG_RESPONSE_BODY === true;

const logger = pino({
  level: env.isProduction ? "info" : "debug",
  transport: env.isProduction ? undefined : { target: "pino-pretty" },
});

const getLogLevel = (status: number) => {
  if (status >= StatusCodes.INTERNAL_SERVER_ERROR) return "error";
  if (status >= StatusCodes.BAD_REQUEST) return "warn";
  return "info";
};

const addRequestId = (req: Request, res: Response, next: NextFunction) => {
  const existingId = req.headers["x-request-id"] as string;
  const requestId = existingId || randomUUID();

  // Set for downstream use
  req.headers["x-request-id"] = requestId;
  res.setHeader("X-Request-Id", requestId);

  next();
};

const httpLogger = () => {
  const requestSerializer = (req: Request) => ({
    method: req.method,
    url: req.url,
    id: req.id,
  });

  return pinoHttp({
    logger,
    genReqId: (req) => req.headers["x-request-id"] as string,
    customLogLevel: (_req, res) => getLogLevel(res.statusCode),
    customSuccessMessage: (req) => `${req.method} ${req.url} completed`,
    customErrorMessage: (_req, res) =>
      `Request failed with status code: ${res.statusCode}`,
    serializers: {
      req: requestSerializer,
    },
    customProps: SHOULD_LOG_RESPONSE_BODY
      ? (_req: Request, res: Response) => ({
          responseBody: res.locals.responseBody,
        })
      : undefined,
  });
};
const captureResponseBody = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (SHOULD_LOG_RESPONSE_BODY) {
    const originalSend = res.send;
    res.send = function (body) {
      res.locals.responseBody = body;
      return originalSend.call(this, body);
    };
  }
  next();
};

export default [addRequestId, captureResponseBody, httpLogger];
