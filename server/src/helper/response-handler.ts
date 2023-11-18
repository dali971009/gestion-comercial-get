const logError = (err: any) => {
  console.error(err);
};

const logErrorMiddleware = (err: any, req: any, res: any, next: any) => {
  logError(err);
  next(err);
};

export interface CustomResponse {
  statusCode: number;
  response: {
    status: boolean;
    code: number;
    message: string;
    data?: any;
  };
}

const returnError = (statusCode: number, message: string): CustomResponse => {
  return {
    statusCode,
    response: {
      status: false,
      code: statusCode,
      message,
    },
  };
};
const returnSuccess = (statusCode: number, message: any, data: any = {}): CustomResponse => {
  return {
    statusCode,
    response: {
      status: true,
      code: statusCode,
      message,
      data,
    },
  };
};

const getPaginationData = (rows: any, page: string | undefined, limit: number) => {
  const { count: totalItems, rows: data } = rows;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    data,
    totalPages,
    currentPage,
  };
};

export default {
  logError,
  logErrorMiddleware,
  returnError,
  returnSuccess,
  getPaginationData,
};
