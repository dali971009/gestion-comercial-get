import config from './config';
import exp from "constants";

export default {
    development: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    test: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    production: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        port: config.port,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
};
