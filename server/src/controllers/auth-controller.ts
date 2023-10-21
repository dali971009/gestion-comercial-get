import httpStatus from "http-status";
import { useAuthService } from "../services/auth-service";
import { useUserService } from "../services/user-service";
import { useTokenService } from "../services/token-service";
import logger from "../config/logger";
import {TokenType} from "../config/enums/token-type";


export const useAuthController = () => {
    const userService = useUserService();
    const tokenService = useTokenService();
    const authService = useAuthService();
    
    async function register(req: any, res: any) {
        try {
            const user = await userService.createUser(req.body);
            let tokens = {};
            const { status } = user.response;
            if (user.response.status) {
                tokens = await tokenService.generateAuthTokens(user.response.data);
            }

            const { message, data } = user.response;
            res.status(user.statusCode).send({ status, message, data, tokens });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function checkEmail(req: any, res: any) {
        try {
            const isExists = await userService.emailExists(req.body.email.toLowerCase());
            // res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function login(req: any, res: any) {
        try {
            const { email, password } = req.body;
            const user = await authService.loginWithEmailPassword(
                email.toLowerCase(),
                password,
            );
            const { message } = user.response;
            const { data } = user.response;
            const { status } = user.response;
            const code = user.statusCode;
            let tokens = {};
            if (user.response.status) {
                tokens = await tokenService.generateAuthTokens(data);
            }
            res.status(user.statusCode).send({ status, code, message, data, tokens });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function logout(req: any, res: any) {
        await authService.logout(req, res);
        res.status(httpStatus.NO_CONTENT).send();
    }

    async function refreshTokens(req: any, res: any) {
        try {
            const refreshTokenDoc = await tokenService.verifyToken(
                req.body.refresh_token,
                TokenType.REFRESH,
            );
            const user = await userService.getUserByUuid(refreshTokenDoc.userId);
            if (user == null) {
                res.status(httpStatus.BAD_GATEWAY).send('User Not Found!');
            }
            await tokenService.removeTokenById(refreshTokenDoc.id);
            const tokens = await tokenService.generateAuthTokens(user);
            res.send(tokens);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function changePassword(req: any, res: any) {
        try {
            const responseData = await userService.changePassword(req.body, req.user.uuid);
            res.status(responseData.statusCode).send(responseData.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    return { register, checkEmail, login, logout, refreshTokens, changePassword }
}
