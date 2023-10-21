import httpStatus from "http-status";
import config from "../config/config";
import logger from "../config/logger";
import ApiError from "../helper/api-error";

export const errorConverter = (err: any, req: any, res: any, next: any) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode: number = error.statusCode
            ? httpStatus.BAD_REQUEST
            : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: any, req: any, res: any, next: any) => {
    let { statusCode, message } = err;
    if (config.nodeEnv === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(config.nodeEnv === 'development' && { stack: err.stack }),
    };

    if (config.nodeEnv === 'development') {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};