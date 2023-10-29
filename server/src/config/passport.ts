import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import config from './config';
import {TokenType} from './enums/token-type';
import UserDao from '../dao/user-dao';
import TokenDao from '../dao/token-dao';
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
        const userDao = new UserDao();
        const tokenDao = new TokenDao();
        // const redisService = new RedisService();
        const authorization =
            req.headers.authorization !== undefined ? req.headers.authorization.split(' ') : [];
        if (authorization[1] === undefined) {
            return done(null, false);
        }

        /* let tokenDoc = redisService.hasToken(authorization[1], 'access_token');
        if (!tokenDoc) {
            console.log('Cache Missed!');
            tokenDoc = await tokenDao.findOne({
                token: authorization[1],
                type: TokenType.ACCESS,
                blacklisted: false,
            });
        }

        if (!tokenDoc) {
            return done(null, false);
        }
        let user = await redisService.getUser(payload.sub);
        if (user) {
            user = new User(user);
        }

        if (!user) {
            console.log('User Cache Missed!');
            user = await userDao.findOneByWhere({ uuid: payload.sub });
            redisService.setUser(user);
        }

        if (!user) {
            return done(null, false);
        }

        done(null, user); */
    } catch (error) {
        console.log(error);
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
