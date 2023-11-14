import jwt, {TokenExpiredError} from "jsonwebtoken";
import moment, {Moment} from "moment";
import config from "../config/config";
import {TokenType} from "../config/enums/token-type";
import TokenDao from "../dao/token-dao";

// import RedisService from "./RedisService";

export interface GenerateAuthTokensResponse {
    access: TokenResponse,
    refresh: TokenResponse,
}

export interface TokenResponse {
    token: string,
    expires: Date,
}

export const useTokenService = () => {
    const tokenDao = new TokenDao();
    // this.redisService = new RedisService();

    function generateToken(uuid: string, expires: Moment, type: string, secret: string = config.jwt.secret): string {
        const payload = {
            sub: uuid,
            iat: moment().unix(),
            exp: expires.unix(),
            type,
        };
        return jwt.sign(payload, secret);
    }

    async function verifyToken(token: string, type: string) {
        const payload: any = jwt.verify(token, config.jwt.secret, function (err: any, decoded: any) {
            if (err) {
                if (err instanceof TokenExpiredError) {
                    throw err;
                } else {
                    throw new Error('Token not found');
                }
            } else {
                // if everything is good, save to request for use in other routes
                return decoded;
            }
        });

        const tokenDoc = await tokenDao.findOne({
            token,
            type,
            userId: payload.sub,
            blacklisted: false,
        });
        if (!tokenDoc) {
            throw new Error('Token not found');
        }
        return tokenDoc;
    }


    /**
     * Save a token
     * @param {string} token
     * @param {integer} userId
     * @param {Moment} expires
     * @param {string} type
     * @param {boolean} [blacklisted]
     * @returns {Promise<Token>}
     */
    async function saveToken(token: string, userId: string, expires: Moment, type: string, blacklisted: boolean = false) {
        return tokenDao.create({
            token,
            user_id: userId,
            expires: expires.toDate(),
            type,
            blacklisted,
        });
    }

    /**
     * Save a multiple token
     * @param {Object} tokens
     * @returns {Promise<Token>}
     */

    async function saveMultipleTokens(tokens: any[]) {
        return tokenDao.bulkCreate(tokens);
    }

    async function removeTokenById(id: string) {
        return tokenDao.remove({ id });
    }

    /**
     * Generate auth tokens
     * @param {{}} user
     * @returns {Promise<Object>}
     */
    async function generateAuthTokens(user: any): Promise<GenerateAuthTokensResponse> {
        const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
        const accessToken: string = generateToken(
            user.uuid,
            accessTokenExpires,
            TokenType.ACCESS,
        );
        const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
        const refreshToken = generateToken(
            user.uuid,
            refreshTokenExpires,
            TokenType.REFRESH,
        );
        const authTokens = [];
        authTokens.push({
            token: accessToken,
            userId: user.id,
            expires: accessTokenExpires.toDate(),
            type: TokenType.ACCESS,
            blacklisted: false,
        });
        authTokens.push({
            token: refreshToken,
            userId: user.id,
            expires: refreshTokenExpires.toDate(),
            type: TokenType.REFRESH,
            blacklisted: false,
        });

        await saveMultipleTokens(authTokens);

        await tokenDao.removeExpiredToken(TokenType.ACCESS);
        await tokenDao.removeExpiredToken(TokenType.REFRESH);

        const tokens: GenerateAuthTokensResponse = {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate(),
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate(),
            },
        };
        // await redisService.createTokens(user.uuid, tokens);

        return tokens;
    }

    return { generateToken, verifyToken, saveToken, saveMultipleTokens, removeTokenById, generateAuthTokens }
}
