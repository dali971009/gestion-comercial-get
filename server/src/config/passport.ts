import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import config from './config';
import {TokenType} from './enums/token-type';
import {PrismaClient} from "@prisma/client";
// import RedisService from '../service/RedisService';

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
};

const jwtVerify = async (req: any, payload: any, done: any) => {
    try {
        if (payload.type !== TokenType.ACCESS) {
            throw new Error('Invalid token type');
        }
        const prisma = new PrismaClient();

        // const redisService = new RedisService();
        const authorization =
            req.headers.authorization !== undefined ? req.headers.authorization.split(' ') : [];
        if (authorization[1] === undefined) {
            return done(null, false);
        }

        let tokenDoc; // TODO = redisService.hasToken(authorization, 'access_token');
        if (!tokenDoc) {
            console.log('Cache Missed!');
            tokenDoc = await prisma.token.findFirst({
                where: {
                    token: authorization,
                    type: TokenType.ACCESS,
                    blacklisted: false,
                }
            });
        }

        if (!tokenDoc) {
            return done(null, false);
        }

        let user; // TODO = await redisService.getUser(payload.sub);
        /* TODO if (user) {
            user = new User(user);
        } */

        if (!user) {
            console.log('User Cache Missed!');
            user = await prisma.user.findFirst({
                where: {
                    id: '',
                }
            });
            // TODO redisService.setUser(user);
        }

        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        console.log(error);
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
