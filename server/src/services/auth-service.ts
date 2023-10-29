import bcrypt from 'bcryptjs';
import httpStatus from "http-status";
import UserDao from "../dao/user-dao";
import TokenDao from "../dao/token-dao";
import {TokenType} from "../config/enums/token-type";
import responseHandler from "../helper/response-handler";
import logger from "../config/logger";
// import RedisService from "./RedisService";

export const useAuthService = () => {
    const userDao = new UserDao();
    const tokenDao = new TokenDao();

    async function loginWithEmailPassword(email: string, password: string) {
        try {
            let message = 'Login Successful';
            let statusCode: number = httpStatus.OK;
            let user = await userDao.findByEmail(email);
            if (user == null) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Invalid Email Address!',
                );
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // @ts-ignore
            delete user.password;

            if (!isPasswordValid) {
                statusCode = httpStatus.BAD_REQUEST;
                message = 'Wrong Password!';
                return responseHandler.returnError(statusCode, message);
            }

            return responseHandler.returnSuccess(statusCode, message, user);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    }

    async function logout(req: any, res: any) {
        const refreshTokenDoc = await tokenDao.findOne({
            token: req.body.refresh_token,
            type: TokenType.REFRESH,
            blacklisted: false,
        });
        if (!refreshTokenDoc) {
            return false;
        }
        await tokenDao.remove({
            token: req.body.refresh_token,
            type: TokenType.REFRESH,
            blacklisted: false,
        });
        await tokenDao.remove({
            token: req.body.access_token,
            type: TokenType.ACCESS,
            blacklisted: false,
        });
        // await this.redisService.removeToken(req.body.access_token, 'access_token');
        // await this.redisService.removeToken(req.body.refresh_token, 'refresh_token');
        return true;
    }

    return { loginWithEmailPassword, logout }
}
