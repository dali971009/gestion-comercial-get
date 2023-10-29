import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from './config';

const enumerateErrorFormat = winston.format((info: any): any => {
    if (info.message instanceof Error) {
        info.message = {
            message: info.message.message,
            stack: info.message.stack,
            ...info.message,
        };
    }

    if (info instanceof Error) {
        // @ts-ignore
        return { message: info.message, stack: info.stack, ...info };
    }

    return info;
});
const transport = new DailyRotateFile({
    filename: config.logConfig.logFolder + config.logConfig.logFile,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '3',
    // prepend: true,
});
transport.on('rotate', (oldFilename, newFilename) => {
    // call function like upload to s3 or on cloud
});

const logger = winston.createLogger({
    format: winston.format.combine(enumerateErrorFormat(), winston.format.json()),
    transports: [
        transport,
        new winston.transports.Console({
            level: 'info',
        }),
    ],
});

export default logger;
