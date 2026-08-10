import { ApiResponse } from "@ecommerce/contracts";
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError, ApplicationError } from "../errors";

const handler: ErrorRequestHandler = (err, _req, res, next) => {
    if (err instanceof ValidationError) {
      res
        .status(err.statusCode)
        .json(ApiResponse.failure(err.message, err.fieldErrors, err.statusCode));
    } else if (err instanceof ApplicationError) {
      res
        .status(err.statusCode)
        .json(ApiResponse.failure(err.message, null, err.statusCode));
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          ApiResponse.failure(
            "Internal server error",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
          ),
        );
    }

};

export const errorHandler = (): [ErrorRequestHandler] => [handler];
