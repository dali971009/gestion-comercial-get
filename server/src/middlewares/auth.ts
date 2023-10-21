import passport from "passport";
import httpStatus from "http-status";
import ApiError from "../helper/api-error";

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
        return new Promise((resolve, reject) => {
            passport.authenticate(
                'jwt',
                { session: false },
                verifyCallback(req, res, resolve, reject),
            )(req, res, next);
        })
            .then(() => {
                return next();
            })
            .catch((err) => {
                return next(err);
            });
    };
};
