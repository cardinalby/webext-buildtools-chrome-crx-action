import winston, { LogMethod } from 'winston';

export function getLogger(): LogMethod {
    const logger = winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.cli()
        ),
        transports: [new winston.transports.Console()]
    });
    return logger.log.bind(logger);
}