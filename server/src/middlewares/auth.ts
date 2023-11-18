import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../helper/errors/api-error';

const verifyCallback = (req: any, res: any, resolve: any, reject: any) => {
  return async (err: any, user: any, info: any) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    resolve();
  };
};

export const auth = () => {
  return async (req: any, res: any, next: any) => {
    try {
      console.log(req.header('x-api-key'));
    } catch (error: any) {}
    return new Promise((resolve, reject) => {})
      .then(() => {
        return next();
      })
      .catch(err => {
        return next(err);
      });
  };
};
